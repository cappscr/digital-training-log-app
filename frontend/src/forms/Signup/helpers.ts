import { object, string, ref } from 'yup';

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

export const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const validationSchema = object({
  name: string().required('Enter your name'),
  email: string().required('Enter your email').email('Enter a valid email'),
  password: string()
    .required('Enter a password')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: string()
    .required('Confirm your password')
    .oneOf([ref('password')], 'Passwords must match'),
});
