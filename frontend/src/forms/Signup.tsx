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
import { AlertError } from '@/components/AlertError';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type User } from '@/hooks/useCurrentUser';
import { apiClient, isApiError } from '@/lib/fetcher';
import { successToast } from '@/lib/toasts';
import { toSentenceCase } from '@/lib/utils';

const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

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

export const SignupForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        <div className="mb-4">
          <AlertError
            title="Error"
            description={form.formState.errors.root.message ?? ''}
          />
        </div>
      )}
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="signup-form-name"
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
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id="signup-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="signup-form-password">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="signup-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="8 character minimum"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="signup-form-confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="signup-form-confirm-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="signup-form"
        size="xl"
        radius="none"
        uppercase
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="mt-8 w-full"
      >
        Create account
      </Button>
    </>
  );
};
