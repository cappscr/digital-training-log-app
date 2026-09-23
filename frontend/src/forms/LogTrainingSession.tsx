import { Link, useNavigate } from 'react-router';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { mutate } from 'swr';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { DateAndTimePicker } from './DateAndTimePicker';
import { DurationInput } from './DurationInput';
import { IndoorOrOutdoorSelector } from './IndoorOrOutdoorSelector';
import { RootFormErrorsAlert } from './RootFormErrorsAlert';
import { SportSelectorField } from './SportSelectorField';
import { RunningFields } from './RunningFields';
import { UNEXPECTED_ERROR_MESSAGE } from './errors';
import { apiClient, isApiError } from '@/lib/fetcher';
import { parseDuration, toISODateString, toSentenceCase } from '@/lib/utils';
import { successToast } from '@/lib/toasts';
import {
  TRAINING_SESSIONS_KEY,
  type TrainingSession,
} from '@/hooks/useTrainingSessions';

const shared = z.object({
  date: z.date({ error: 'Select a date' }),
  time: z.string().optional(),
  indoor_or_outdoor: z.enum(['indoor', 'outdoor']),
  duration: z
    .string()
    .refine((value) => !value.trim() || parseDuration(value) !== null, {
      message: 'Enter a valid duration (e.g. 1:30:00 or 45:30)',
    }),
  notes: z.string().optional(),
});

const runningSchema = shared
  .extend({
    type: z.literal('running'),
    distance: z
      .number({ error: 'Enter a distance' })
      .positive('Distance must be greater than 0')
      .optional()
      .refine((n) => n === undefined || Math.round(n * 100) / 100 === n, {
        message: 'Use at most two decimal places',
      }),
    unit: z.enum(['mi', 'km']),
    elevation_gain: z
      .number({ error: 'Enter an elevation gain' })
      .positive('Elevation gain must be greater than 0')
      .optional(),
    average_heart_rate: z
      .number({ error: 'Enter a heart rate' })
      .positive('Heart rate must be greater than 0')
      .optional(),
    average_cadence: z
      .number({ error: 'Enter a cadence' })
      .positive('Cadence must be greater than 0')
      .optional(),
  })
  .refine(
    (data) =>
      parseDuration(data.duration) !== null || data.distance !== undefined,
    {
      message: "Duration and distance can't both be blank",
      path: ['duration'],
    },
  );

const crossTrainingSchema = shared
  .extend({
    type: z.literal('cross_training'),
    activity: z.string().trim().min(1).max(100),
    distance: z
      .number({ error: 'Enter a distance' })
      .positive('Distance must be greater than 0')
      .optional()
      .refine((n) => n === undefined || Math.round(n * 100) / 100 === n, {
        message: 'Use at most two decimal places',
      }),
    unit: z.enum(['mi', 'km']),
    elevation_gain: z
      .number({ error: 'Enter an elevation gain' })
      .positive('Elevation gain must be greater than 0')
      .optional(),
    elevation_unit: z.enum(['ft', 'm']).optional(),
    average_heart_rate: z
      .number({ error: 'Enter a heart rate' })
      .positive('Heart rate must be greater than 0')
      .optional(),
  })
  .refine(
    (data) =>
      parseDuration(data.duration) !== null || data.distance !== undefined,
    {
      message: "Duration and distance can't both be blank",
      path: ['duration'],
    },
  );

const formSchema = z.discriminatedUnion('type', [
  runningSchema,
  crossTrainingSchema,
]);

export type LogTrainingSessionFormValues = z.infer<typeof formSchema>;

interface LogTrainingSessionFormProps {
  trainingSessionToEdit?: TrainingSession | null;
}

export const LogTrainingSessionForm = ({
  trainingSessionToEdit = null,
}: LogTrainingSessionFormProps) => {
  const navigate = useNavigate();

  const form = useForm<LogTrainingSessionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: trainingSessionToEdit
      ? {
          date: new Date(trainingSessionToEdit.session_date + 'T00:00:00'),
          time: trainingSessionToEdit.session_time ?? '',
          indoor_or_outdoor: trainingSessionToEdit.location_type,
          duration: trainingSessionToEdit.duration ?? '',
          notes: trainingSessionToEdit.notes ?? '',
          type: 'run',
          distance: trainingSessionToEdit.sport_details.distance ?? undefined,
          unit: trainingSessionToEdit.sport_details.distance_unit ?? 'mi',
          elevation_gain:
            trainingSessionToEdit.sport_details.elevation_gain ?? undefined,
          average_heart_rate:
            trainingSessionToEdit.sport_details.average_heart_rate ?? undefined,
          average_cadence:
            trainingSessionToEdit.sport_details.average_cadence ?? undefined,
        }
      : {
          date: new Date(),
          indoor_or_outdoor: 'outdoor',
          duration: '',
          notes: '',
          time: '',
          type: 'run',
          distance: undefined,
          unit: 'mi',
        },
    mode: 'onTouched',
  });

  const [sport] = useWatch({
    control: form.control,
    name: ['type'],
  });

  async function handleSubmit(data: LogTrainingSessionFormValues) {
    const trainingSessionId = trainingSessionToEdit?.id ?? crypto.randomUUID();
    const runningSessionId =
      trainingSessionToEdit?.sport_details.id ?? crypto.randomUUID();

    try {
      await apiClient<{ trainingSession: TrainingSession }>(
        trainingSessionToEdit ? 'PUT' : 'POST',
        trainingSessionToEdit
          ? `/training_sessions/${trainingSessionId}`
          : '/training_sessions',
        {
          training_session: {
            id: trainingSessionId,
            session_date: toISODateString(data.date),
            session_time: data.time ?? null,
            duration_seconds: parseDuration(data.duration),
            location_type: data.indoor_or_outdoor,
            notes: data.notes,
            sport_details: {
              id: runningSessionId,
              kind: data.type,
              distance: data.distance ?? null,
              distance_unit: data.unit,
              elevation_gain: data.elevation_gain ?? null,
              average_heart_rate: data.average_heart_rate ?? null,
              average_cadence: data.average_cadence ?? null,
            },
          },
        },
      );
      if (trainingSessionToEdit) {
        await mutate(`/training_sessions/${trainingSessionId}`);
      }
      await mutate(TRAINING_SESSIONS_KEY);
      successToast(
        trainingSessionToEdit
          ? 'Training session updated successfully'
          : 'Training session logged successfully',
      );
      navigate('/training-sessions');
    } catch (apiError) {
      if (isApiError(apiError) && apiError.status === 422) {
        const errors = apiError.data?.errors;
        const field = errors?.[0]?.pointer.replace(
          /^#\/training_session(?:\/sport_details)?\/?/,
          '',
        );
        const message = errors?.[0]
          ? toSentenceCase([field, errors[0].detail].filter(Boolean).join(' '))
          : UNEXPECTED_ERROR_MESSAGE;
        form.setError('root', { message });
      } else {
        form.setError('root', { message: UNEXPECTED_ERROR_MESSAGE });
      }
    }
  }

  return (
    <>
      {form.formState.errors.root && (
        <RootFormErrorsAlert
          errorMessage={form.formState.errors.root.message ?? ''}
        />
      )}
      <form
        key={trainingSessionToEdit?.id ?? 'new'}
        id="log-workout-form"
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <DateAndTimePicker
                control={form.control}
                formId="log-workout-form"
                dateName="date"
                timeName="time"
              />

              <SportSelectorField
                control={form.control}
                formId="log-workout-form"
                name="type"
              />
              <IndoorOrOutdoorSelector
                control={form.control}
                formId="log-workout-form"
                name="indoor_or_outdoor"
              />
              <DurationInput
                control={form.control}
                formId="log-workout-form"
                name="duration"
              />
              <Controller
                name="notes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="log-workout-form-notes">
                      Notes
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="log-workout-form-notes"
                      aria-invalid={fieldState.invalid}
                      placeholder="Add any notes about the workout"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {sport === 'running' && <RunningFields form={form} />}
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Submit
            </Button>
            <Link
              to="/training-sessions"
              className={buttonVariants({
                variant: 'outline',
                size: 'default',
              })}
            >
              Cancel
            </Link>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
};
