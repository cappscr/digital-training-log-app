import { Formik, Form, type FormikHelpers } from 'formik';
import {
  initialValues,
  validationSchema,
  type SignupFormValues,
} from './helpers';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export function SignupForm() {
  const handleSubmit = async (
    values: SignupFormValues,
    { setStatus, setSubmitting }: FormikHelpers<SignupFormValues>,
  ) => {
    setStatus(undefined);
    setSubmitting(true);
    try {
      console.log(values);
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response?.status === 422) {
        setStatus(
          apiError.response?.data.message ||
            'Validation error. Please check your input and try again.',
        );
      } else {
        setStatus('An unexpected error occurred. Please try again later.');
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
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
      }) => (
        <Form>
          <Stack spacing={4} alignItems="flex-start">
            <TextField
              type="text"
              id="name"
              label="Name"
              helperText={touched.name && errors.name ? errors.name : null}
              error={touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              required
              sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}
            />
            <TextField
              type="email"
              id="email"
              label="Email"
              helperText={touched.email && errors.email ? errors.email : null}
              error={touched.email && !!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              required
              sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              helperText={
                touched.password && errors.password ? errors.password : null
              }
              error={touched.password && !!errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
              sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}
            />
            <TextField
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              helperText={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
              error={touched.confirmPassword && !!errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              required
              sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={!isValid || isSubmitting}
            >
              Create account
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
