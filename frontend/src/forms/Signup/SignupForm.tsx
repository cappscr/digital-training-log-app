import { Formik, Form, type FormikHelpers } from 'formik';
import {
  initialValues,
  validationSchema,
  type SignupFormValues,
} from './signup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
    <Box sx={{ flexGrow: 1 }}>
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
            <Stack spacing={1}>
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
    </Box>
  );
}
