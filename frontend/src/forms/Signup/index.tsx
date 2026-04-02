import { Formik, Form, type FormikHelpers } from 'formik';
import {
  initialValues,
  validationSchema,
  UNEXPECTED_ERROR_MESSAGE,
  type SignupFormValues,
} from './helpers';
import { apiClient } from '@/fetcher';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AlertDestructive } from '@/components/DestructiveAlert';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignupForm() {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: SignupFormValues,
    { setStatus, setSubmitting }: FormikHelpers<SignupFormValues>,
  ) => {
    try {
      setStatus(null);
      const response = await apiClient.post('/signup', {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirmPassword,
        },
      });
      navigate(`/users/${response.data.id}?message=welcome`);
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response?.status === 422) {
        setStatus(apiError.response?.data.errors || [UNEXPECTED_ERROR_MESSAGE]);
      } else {
        setStatus([UNEXPECTED_ERROR_MESSAGE]);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        status,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <div className="flex-start flex w-full flex-col gap-8">
            {status && (
              <div className="mb-4">
                {status.map((msg: string, index: number) => (
                  <AlertDestructive
                    title="Error"
                    description={msg}
                    key={index}
                  />
                ))}
              </div>
            )}
            <Field data-invalid={touched.name && !!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                autoComplete="name"
                placeholder="Your name"
                type="text"
                id="name"
                aria-invalid={touched.name && !!errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required
              />
              {touched.name && errors.name && (
                <FieldError>{errors.name}</FieldError>
              )}
            </Field>
            <Field data-invalid={touched.email && !!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                autoComplete="email"
                placeholder="you@example.com"
                type="email"
                id="email"
                aria-invalid={touched.email && !!errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
              />
              {touched.email && errors.email && (
                <FieldError>{errors.email}</FieldError>
              )}
            </Field>
            <Field data-invalid={touched.password && !!errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                autoComplete="new-password"
                placeholder="8 characters minimum"
                type="password"
                id="password"
                aria-invalid={touched.password && !!errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
              />
            </Field>
            <Field
              data-invalid={touched.confirmPassword && !!errors.confirmPassword}
            >
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                autoComplete="new-password"
                placeholder="Re-enter your password"
                type="password"
                id="confirmPassword"
                aria-invalid={
                  touched.confirmPassword && !!errors.confirmPassword
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FieldError>{errors.confirmPassword}</FieldError>
              )}
            </Field>

            <Button
              type="submit"
              size="xl"
              radius="none"
              uppercase
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              Create account
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
