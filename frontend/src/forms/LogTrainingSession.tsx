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
import { CrossTrainingFields } from './CrossTrainingFields';
import { UNEXPECTED_ERROR_MESSAGE } from './errors';
import { apiClient, isApiError } from '@/lib/fetcher';
import { parseDuration, toISODateString, toSentenceCase } from '@/lib/utils';
import { successToast } from '@/lib/toasts';
import {
  TRAINING_SESSIONS_KEY,
  type CrossTrainingSession,
  type RunningTrainingSession,
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

const defaultValuesFromSession = (
  session?: TrainingSession | null,
): LogTrainingSessionFormValues => {
  if (!session)
    return {
      date: new Date(),
      time: '',
      indoor_or_outdoor: 'outdoor',
      duration: '',
      notes: '',
      type: 'running',
      distance: undefined,
      unit: 'mi',
    };

  const shared = {
    date: new Date(session.session_date + 'T00:00:00'),
    time: session.session_time ?? '',
    indoor_or_outdoor: session.location_type,
    duration: session.duration ?? '',
    notes: session.notes ?? '',
  };

  if (session.sport_details_type === 'CrossTrainingSession') {
    const d = session.sport_details as CrossTrainingSession;
    return {
      ...shared,
      type: 'cross_training',
      activity: d.activity,
      distance: d.distance ?? undefined,
      unit: d.distance_unit ?? 'mi',
      elevation_gain: d.elevation_gain ?? undefined,
      elevation_unit: d.elevation_unit ?? undefined,
      average_heart_rate: d.average_heart_rate ?? undefined,
    };
  }

  const d = session.sport_details as RunningTrainingSession;
  return {
    ...shared,
    type: 'running',
    distance: d.distance ?? undefined,
    unit: d.distance_unit ?? 'mi',
    elevation_gain: d.elevation_gain ?? undefined,
    average_heart_rate: d.average_heart_rate ?? undefined,
    average_cadence: d.average_cadence ?? undefined,
  };
};

const defaultsForSport = (type: string) => {
  const shared = {
    distance: undefined,
    distance_unit: 'mi',
    elevation_gain: undefined,
    average_heart_rate: undefined,
  };
  switch (type) {
    case 'cross_training':
      return {
        ...shared,
        type: 'cross_training',
        elevation_gain_unit: undefined,
      };
    case 'running':
      return { ...shared, type: 'running', average_cadence: undefined };
    default:
      console.warn('Unsupported sport type');
      return {};
  }
};

const buildSportDetailsSubmit = (values: LogTrainingSessionFormValues) => {
  const sport = values.type;

  switch (sport) {
    case 'cross_training':
      return {
        activity: values.activity,
        elevation_unit: values.elevation_unit ?? null,
      };
    case 'running':
      return {
        average_cadence: values.average_cadence ?? null,
      };
    default:
      console.warn('Unsupported sport type');
      return {};
  }
};

const buildSubmitPayload = (
  values: LogTrainingSessionFormValues,
  id: string,
  sportDetailsId: string,
) => {
  const sport = values.type;

  const shared = {
    id,
    session_date: toISODateString(values.date),
    session_time: values.time ?? null,
    duration_seconds: parseDuration(values.duration),
    location_type: values.indoor_or_outdoor,
    notes: values.notes,
  };

  const sharedSportDetails = {
    distance: values.distance ?? null,
    distance_unit: values.unit ?? null,
    elevation_gain: values.elevation_gain ?? null,
    average_heart_rate: values.average_heart_rate ?? null,
  };

  return {
    ...shared,
    sport_details: {
      id: sportDetailsId,
      kind: sport,
      ...sharedSportDetails,
      ...buildSportDetailsSubmit(values),
    },
  };
};

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
  const isEditMode = !!trainingSessionToEdit;

  const form = useForm<LogTrainingSessionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesFromSession(trainingSessionToEdit),
  });

  const [sport] = useWatch({
    control: form.control,
    name: ['type'],
  });

  async function handleSubmit(data: LogTrainingSessionFormValues) {
    const trainingSessionId = trainingSessionToEdit?.id ?? crypto.randomUUID();
    const sportDetailsId =
      trainingSessionToEdit?.sport_details.id ?? crypto.randomUUID();

    try {
      await apiClient<{ trainingSession: TrainingSession }>(
        trainingSessionToEdit ? 'PUT' : 'POST',
        trainingSessionToEdit
          ? `/training_sessions/${trainingSessionId}`
          : '/training_sessions',
        {
          training_session: {
            ...buildSubmitPayload(data, trainingSessionId, sportDetailsId),
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
                disabled={isEditMode}
                onSportChange={(nextSport) => {
                  const current = form.getValues();
                  form.reset({
                    date: current.date,
                    time: current.time,
                    indoor_or_outdoor: current.indoor_or_outdoor,
                    duration: current.duration,
                    notes: current.notes,
                    ...defaultsForSport(nextSport),
                  });
                }}
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
              {sport === 'cross_training' && (
                <CrossTrainingFields form={form} />
              )}
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
