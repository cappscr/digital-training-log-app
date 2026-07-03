import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FieldGroup } from '@/components/ui/field';
import { AlertError } from '@/components/AlertError';
import { Button } from '@/components/ui/button';
import { EmailInput } from './EmailInput';
import { successToast } from '@/lib/toasts';
import { apiClient, isApiError } from '@/lib/fetcher';
import { toSentenceCase } from '@/lib/utils';

const EMAIL_ADDRESS_NOT_FOUND_MESSAGE =
  'No account was found for that email address. Please try again.';
const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

const formSchema = z.object({
  email: z.email('Enter a valid email'),
});

export const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient<{ message: string }>(
        'POST',
        '/password-reset',
        {
          email: data.email,
        },
      );
      successToast(
        response?.message ?? 'Password reset email sent successfully.',
      );
    } catch (apiError) {
      if (isApiError(apiError) && apiError.status === 404) {
        const message = apiError.data?.detail
          ? toSentenceCase(EMAIL_ADDRESS_NOT_FOUND_MESSAGE)
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
          <EmailInput control={form.control} formId="login-form" name="email" />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="login-form"
        size="xl"
        radius="none"
        uppercase
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="mt-8 w-full"
      >
        Send Reset Email
      </Button>
    </>
  );
};
