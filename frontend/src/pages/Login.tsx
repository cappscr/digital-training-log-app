import { Link, useNavigate } from 'react-router';
import { AuthFormPageLayout } from '@/layouts/AuthFormPageLayout';
import { LoginForm } from '@/forms/Login';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useCurrentUser();

  if (isAuthenticated) {
    navigate(`/users/${user?.id}`);
  }

  return (
    <AuthFormPageLayout
      pageName="Login"
      title="Welcome back."
      caption={
        <>
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthFormPageLayout>
  );
};
