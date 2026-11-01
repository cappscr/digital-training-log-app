import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { RootFormErrorsAlert } from './RootFormErrorsAlert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmailInput } from './EmailInput';
import { type User } from '@/hooks/useCurrentUser';
import { apiClient, isApiError } from '@/lib/fetcher';
import { successToast } from '@/lib/toasts';
import { toSentenceCase } from '@/lib/utils';
import { UNEXPECTED_ERROR_MESSAGE } from './errors';

const formSchema = z
  .object({
    name: z.string().min(1, 'Enter your name'),
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

interface UserSettingsFormProps {
  currentUser: User | null;
}

export const UserSettingsForm = ({ currentUser }: UserSettingsFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const id = crypto.randomUUID();
    try {
      const response = await apiClient<{ user: User }>('POST', '/signup', {
        user: {
          id,
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
      });
      successToast('Welcome to the Digital Training Log!');
      navigate('/signup/confirm', { state: { email: response?.user.email } });
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
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="user-settings-form"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="mt-8 w-full uppercase"
      >
        Save changes
      </Button>
    </>
  );
};
