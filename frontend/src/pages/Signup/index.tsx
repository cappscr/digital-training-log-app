import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PageTitle } from '@/components/PageTitle';
import { SignupForm } from '@/forms/Signup';

export const SignupPage = () => {
  return (
    <>
      <PageTitle pageName="Sign Up" />
      <Card
        sx={{ p: 2, width: { xs: '100%', sm: '60%', md: '50%' }, mx: 'auto' }}
      >
        <CardActionArea>
          <CardHeader
            title={
              <Typography variant="h3" component="h1">
                Sign Up
              </Typography>
            }
          />
          <CardContent>
            <SignupForm />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
