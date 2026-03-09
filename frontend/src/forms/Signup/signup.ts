export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
