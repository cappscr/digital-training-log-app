import { Formik, Form, type FormikHelpers } from 'formik';
import { useTheme, useMediaQuery } from '@mui/material';
import {
  initialValues,
  validationSchema,
  UNEXPECTED_ERROR_MESSAGE,
  type SignupFormValues,
} from './helpers';
import { apiClient } from '@/fetcher';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export function SignupForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          <Stack spacing={4} alignItems="flex-start">
            {status && (
              <Box sx={{ color: 'error.main', mb: 2 }}>
                {status.map((msg: string, index: number) => (
                  <Alert severity="error" key={index} sx={{ mb: 1 }}>
                    {msg}
                  </Alert>
                ))}
              </Box>
            )}
            <TextField
              type="text"
              id="name"
              label="Name"
              helperText={touched.name && errors.name ? errors.name : null}
              error={touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              size={isMobile ? 'medium' : 'small'}
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
              size={isMobile ? 'medium' : 'small'}
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
              size={isMobile ? 'medium' : 'small'}
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
              size={isMobile ? 'medium' : 'small'}
              required
              sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}
            />
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'large' : 'small'}
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
