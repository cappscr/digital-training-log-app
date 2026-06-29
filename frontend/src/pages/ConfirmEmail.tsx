import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { /* Link, */ useLocation } from 'react-router';

export const ConfirmEmailPage = () => {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <>
      <PageTitle pageName="Confirm Email" />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-5xl leading-tight font-normal">
              Check your email
            </h1>
            <p className="text-muted-foreground">
              We sent an activation link to{' '}
              {email && (
                <span className="text-foreground font-medium">{email}</span>
              )}
              . Click the link to confirm your account.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              size="xl"
              radius="none"
              uppercase
              nativeButton={false}
              render={<a href="mailto:" />}
            >
              Open Email App
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Didn't receive it?{' '}
              {/* <Link
                to="/signup"
                className="text-foreground underline underline-offset-4"
              >
                Try signing up again
              </Link>{' '}
              or c*/}
              Check your spam folder.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
