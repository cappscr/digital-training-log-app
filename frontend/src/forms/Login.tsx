import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import axios from 'axios';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { AlertError } from '@/components/AlertError';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/fetcher';
import { toSentenceCase } from '@/lib/utils';

const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

const formSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await apiClient.post('/login', data);
      navigate(`/users/${response.data?.user.id}`);
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response?.status === 401) {
        const message = apiError.response?.data.detail
          ? toSentenceCase(apiError.response?.data.detail)
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
        Log in
      </Button>
    </>
  );
};
