import { Link, useNavigate } from 'react-router';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { mutate } from 'swr';
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
import { DateAndTimePicker } from '../DateAndTimePicker';
import { DurationInput } from '../DurationInput';
import { IndoorOrOutdoorSelector } from '../IndoorOrOutdoorSelector';
import { RootFormErrorsAlert } from '../RootFormErrorsAlert';
import { SportSelectorField } from '../SportSelectorField';
import { RunningFields } from './RunningFields';
import { CrossTrainingFields } from './CrossTrainingFields';
import {
  logTrainingSessionFormSchema,
  type LogTrainingSessionFormValues,
} from './logTrainingSessionSchemas';
import {
  defaultValuesFromSession,
  defaultsForSport,
} from './logTrainingSessionDefaultValues';
import { buildSubmitPayload } from './logTrainingSessionBuildSubmitPayload';
import { UNEXPECTED_ERROR_MESSAGE } from '../errors';
import { apiClient, isApiError } from '@/lib/fetcher';
import { toSentenceCase } from '@/lib/utils';
import { successToast } from '@/lib/toasts';
import {
  TRAINING_SESSIONS_KEY,
  type TrainingSession,
} from '@/hooks/useTrainingSessions';

interface LogTrainingSessionFormProps {
  trainingSessionToEdit?: TrainingSession | null;
}

export const LogTrainingSessionForm = ({
  trainingSessionToEdit = null,
}: LogTrainingSessionFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!trainingSessionToEdit;

  const form = useForm<LogTrainingSessionFormValues>({
    resolver: zodResolver(logTrainingSessionFormSchema),
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
