import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { RootFormErrorsAlert } from '../RootFormErrorsAlert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmailInput } from '../EmailInput';
import { MicrocycleStartDayToggle } from './MicrocycleStartDayToggle';
import { DefaultUnitToggle } from './DefaultUnitToggle';
import { type User } from '@/hooks/useCurrentUser';
import { apiClient, isApiError } from '@/lib/fetcher';
import { successToast } from '@/lib/toasts';
import { toSentenceCase } from '@/lib/utils';
import { UNEXPECTED_ERROR_MESSAGE } from '../errors';

const formSchema = z.object({
  name: z.string().min(1, 'Enter your name'),
  email: z.email('Enter a valid email'),
  microcycle_start_day: z.enum(['sunday', 'monday']),
  default_distance_unit: z.enum(['km', 'mi']),
  default_weight_unit: z.enum(['kg', 'lbs']),
  default_elevation_unit: z.enum(['m', 'ft']),
});

interface UserSettingsFormProps {
  currentUser: User | null;
}

export const UserSettingsForm = ({ currentUser }: UserSettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await apiClient<{ user: User }>('PATCH', '/users/me', {
        user: {
          name: data.name,
          microcycle_start_day: data.microcycle_start_day,
        },
      });
      successToast('Settings saved successfully');
    } catch (apiError) {
      if (isApiError(apiError) && apiError.status === 422) {
        const errors = apiError.data?.errors;
        const message = errors?.[0]
          ? toSentenceCase(
              `${errors[0].pointer.replace('#/user/', '')} ${errors[0].detail}`,
            )
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
      <form id="user-settings-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Profile</FieldLegend>
            <FieldDescription>
              Update your account information here.
            </FieldDescription>
            <FieldGroup className="flex flex-row gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="user-settings-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <EmailInput
                control={form.control}
                formId="signup-form"
                name="email"
                disabled
                description="The ability to change your email is coming soon."
              />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Week</FieldLegend>
            <FieldDescription>
              Used to paginate the training sessions list and in various
              calculations.
            </FieldDescription>
            <MicrocycleStartDayToggle
              control={form.control}
              formId="user-settings-form"
              name="microcycle_start_day"
              defaultValue={
                currentUser?.settings.microcycle_start_day ?? 'sunday'
              }
            />
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Units</FieldLegend>
            <FieldDescription>
              Applied to new sessions, new sets, and pace calculations. Existing
              entries keep the units they were logged with.
            </FieldDescription>
            <FieldGroup>
              <DefaultUnitToggle
                control={form.control}
                formId="user-settings-form"
                name="default_distance_unit"
                label="Distance"
                defaultValue={
                  currentUser?.settings.default_distance_unit ?? 'km'
                }
                options={[
                  { value: 'km', label: 'Kilometers' },
                  { value: 'mi', label: 'Miles' },
                ]}
              />
              <DefaultUnitToggle
                control={form.control}
                formId="user-settings-form"
                name="default_weight_unit"
                label="Weight"
                defaultValue={currentUser?.settings.default_weight_unit ?? 'kg'}
                options={[
                  { value: 'kg', label: 'Kilograms' },
                  { value: 'lbs', label: 'Pounds' },
                ]}
              />
              <DefaultUnitToggle
                control={form.control}
                formId="user-settings-form"
                name="default_elevation_unit"
                label="Elevation"
                defaultValue={
                  currentUser?.settings.default_elevation_unit ?? 'm'
                }
                options={[
                  { value: 'm', label: 'Meters' },
                  { value: 'ft', label: 'Feet' },
                ]}
              />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Appearance</FieldLegend>
            <FieldDescription>
              Update the appearance of the app. We recommend using dark mode as
              the site is designed for it.
            </FieldDescription>
          </FieldSet>
        </FieldGroup>
      </form>
      <div className="my-8 flex justify-end">
        <Button
          type="submit"
          form="user-settings-form"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Save settings
        </Button>
      </div>
    </>
  );
};
