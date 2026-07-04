import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import * as z from 'zod';
import { mutate } from 'swr';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { AlertError } from '@/components/AlertError';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EmailInput } from './EmailInput';
import { PasswordInput } from './PasswordInput';
import { CURRENT_USER_KEY, type User } from '@/hooks/useCurrentUser';
import { apiClient, isApiError } from '@/lib/fetcher';
import { toSentenceCase } from '@/lib/utils';
import { setAccessToken } from '@/lib/auth';

const INVALID_CREDENTIALS_MESSAGE =
  'Invalid email or password. Please try again.';
const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

const formSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient<{ access_token: string; user: User }>(
        'POST',
        '/login',
        {
          email: data.email,
          password: data.password,
          remember_me: data.rememberMe,
        },
      );
      if (response?.access_token) {
        setAccessToken(response.access_token);
      }
      await mutate(CURRENT_USER_KEY, { user: response?.user }, false);
      navigate(`/users/${response?.user.id}`);
    } catch (apiError) {
      if (isApiError(apiError) && apiError.status === 401) {
        const message = apiError.data?.detail
          ? toSentenceCase(INVALID_CREDENTIALS_MESSAGE)
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
          <PasswordInput
            control={form.control}
            formId="login-form"
            name="password"
            autoCompleteType="current"
          />
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <Field>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="login-form-remember-me"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                  <FieldLabel
                    htmlFor="login-form-remember-me"
                    className="cursor-pointer"
                  >
                    Remember me
                  </FieldLabel>
                </div>
              </Field>
            )}
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
        Log in
      </Button>
      <p className="mt-4 text-center text-sm">
        <Link
          to="/forgot-password"
          className="text-muted-foreground hover:text-primary"
        >
          Forgot password?
        </Link>
      </p>
    </>
  );
};
