import { PageTitle } from '@/components/PageTitle';
import { Link } from 'react-router';

export const LoginPage = () => {
  return (
    <>
      <PageTitle pageName="Login" />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-3xl">Welcome back.</h1>
            <p className="text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
