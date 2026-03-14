import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { PageTitle } from '@/components/PageTitle';
import { SignupForm } from '@/forms/Signup';

export const SignupPage = () => {
  return (
    <>
      <PageTitle pageName="Sign Up" />
      <Stack spacing={4}>
        <Typography variant="h3" component="h1">
          Sign Up
        </Typography>
        <SignupForm />
      </Stack>
    </>
  );
};
