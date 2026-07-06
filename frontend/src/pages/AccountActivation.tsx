import { PageTitle } from '@/components/PageTitle';
import { successToast, errorToast } from '@/lib/toasts';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useActivateAccount } from '@/hooks/useActivateAccount';
import { useGetNewActivationLink } from '@/hooks/useGetNewActivationLink';

export const AccountActivationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const {
    activateAccount,
    isLoading,
    error: activationError,
  } = useActivateAccount(token);
  const { getNewActivationLink } = useGetNewActivationLink();

  const [isError, setIsError] = useState<boolean>(false);

  const handleGetNewActivationLink = () => {
    if (!email) {
      errorToast('Email is required to get a new activation link.');
      return;
    }

    getNewActivationLink({ email })
      .then(() => {
        successToast(
          'A new activation link has been sent to your email address.',
        );
      })
      .catch((apiError) => {
        const status = apiError?.status;
        if (status === 403) {
          errorToast(
            <div>
              User account with email {email} is already activated. Please{' '}
              <Link to="/login" className="underline">
                log in
              </Link>{' '}
              or{' '}
              <Link to="/forgot-password" className="underline">
                reset your password
              </Link>
              .
            </div>,
          );
        } else if (status === 404) {
          errorToast(`No user account found with email ${email}. Please check the email
              address and try again.`);
        } else {
          errorToast(
            'An unexpected error occurred while requesting a new activation link. Please try again later.',
          );
        }
      });
  };

  useEffect(() => {
    let cancelled = false;

    if (token && email) {
      activateAccount({ email })
        .then(() => {
          if (cancelled) return;
          successToast(
            'Your account has been successfully activated! You can now log in.',
          );
          navigate('/login');
        })
        .catch(() => {
          setIsError(true);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [token, email, navigate, activateAccount]);

  return (
    <>
      <PageTitle pageName="Account Activation" />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-5xl leading-tight">
              Activating your account...
            </h1>
            {isLoading && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <p className="text-muted-foreground">
                  Please wait while we activate your account.
                </p>
                <Spinner className="size-10" />
              </div>
            )}
            {isError && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <p className="text-red-500">
                  {activationError?.data.detail}, your account is already
                  activated or could not be activated
                </p>
                <Button
                  className="mt-4"
                  size="xl"
                  radius="none"
                  uppercase
                  nativeButton={false}
                  render={<Link to="/" />}
                >
                  Return home
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  radius="none"
                  uppercase
                  nativeButton={false}
                  onClick={handleGetNewActivationLink}
                >
                  Get a new activation link
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
