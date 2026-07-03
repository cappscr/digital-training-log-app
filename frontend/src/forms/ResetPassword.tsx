import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FieldGroup } from '@/components/ui/field';
import { AlertError } from '@/components/AlertError';
import { Button } from '@/components/ui/button';
import { PasswordInput } from './PasswordInput';
import { successToast } from '@/lib/toasts';
import { apiClient, isApiError } from '@/lib/fetcher';

const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient<{ message: string }>(
        'PATCH',
        `/password-reset/${token}`,
        {
          email,
          user: {
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
        },
      );
      successToast(response?.message ?? 'Password reset successfully.');
      navigate('/login');
    } catch (apiError) {
      if (isApiError(apiError)) {
        const message = apiError.data?.detail
          ? apiError.data?.detail
          : UNEXPECTED_ERROR_MESSAGE;
        form.setError('root', {
          message,
        });
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
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <PasswordInput
            control={form.control}
            formId="login-form"
            name="password"
            autoCompleteType="new"
          />
          <PasswordInput
            control={form.control}
            formId="login-form"
            name="confirmPassword"
            autoCompleteType="new"
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="login-form"
        size="xl"
        radius="none"
        uppercase
        disabled={form.formState.isSubmitting}
        className="mt-8 w-full"
      >
        Reset Password
      </Button>
    </>
  );
};
