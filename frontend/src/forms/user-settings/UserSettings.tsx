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
import { ThemeToggle } from './ThemeToggle';
import { useCurrentUser, type User } from '@/hooks/useCurrentUser';
import { useTheme } from '@/components/ThemeProvider';
import { apiClient, isApiError } from '@/lib/fetcher';
import { successToast } from '@/lib/toasts';
import { toSentenceCase } from '@/lib/utils';
import { UNEXPECTED_ERROR_MESSAGE } from '../errors';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Enter your name')
    .max(50, 'Name must be less than 50 characters'),
  email: z.email('Enter a valid email'),
  microcycle_start_day: z.enum(['sunday', 'monday']),
  default_distance_unit: z.enum(['km', 'mi']),
  default_weight_unit: z.enum(['kg', 'lbs']),
  default_elevation_unit: z.enum(['m', 'ft']),
  theme: z.enum(['light', 'dark', 'system']),
});

interface UserSettingsFormProps {
  currentUser: User | null;
}

export const UserSettingsForm = ({ currentUser }: UserSettingsFormProps) => {
  const { mutate } = useCurrentUser();
  const { theme, setTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
      microcycle_start_day:
        currentUser?.settings.microcycle_start_day ?? 'sunday',
      default_distance_unit:
        currentUser?.settings.default_distance_unit ?? 'mi',
      default_weight_unit: currentUser?.settings.default_weight_unit ?? 'lbs',
      default_elevation_unit:
        currentUser?.settings.default_elevation_unit ?? 'ft',
      theme: currentUser?.settings.theme ?? 'dark',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient<{ user: User }>('PATCH', '/users/me', {
        user: {
          name: data.name,
          microcycle_start_day: data.microcycle_start_day,
          default_distance_unit: data.default_distance_unit,
          default_weight_unit: data.default_weight_unit,
          default_elevation_unit: data.default_elevation_unit,
          theme: data.theme,
        },
      });
      successToast('Settings saved successfully');
      if (response) {
        if (data.theme !== theme) {
          setTheme(data.theme);
        }
        await mutate(response, false);
      }
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
            <FieldGroup className="flex flex-col gap-4 sm:flex-row">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="user-settings-form-name">
                      Name
                    </FieldLabel>
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
              Applied as defaults for new sessions, new sets, and pace
              calculations. Does not affect existing entries.
            </FieldDescription>
            <FieldGroup className="flex flex-col gap-4 sm:flex-row">
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
              Update the appearance of the app. Dark mode is recommended.
            </FieldDescription>
            <ThemeToggle
              control={form.control}
              formId="user-settings-form"
              name="theme"
              defaultValue={currentUser?.settings.theme ?? 'dark'}
            />
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
