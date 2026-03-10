import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SignupForm } from '../../forms/Signup/SignupForm';

export const SignupPage = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3" component="h1" color="secondary.500">
        Sign Up
      </Typography>
      <SignupForm />
    </Stack>
  );
};
