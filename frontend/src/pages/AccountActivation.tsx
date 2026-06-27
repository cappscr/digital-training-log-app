import { PageTitle } from '@/components/PageTitle';
import { successToast } from '@/lib/toasts';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useActivateAccount } from '@/hooks/useActivateAccount';

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
  const [isError, setIsError] = useState<boolean>(false);

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
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-3xl">
              Activating your account...
            </h1>
            {isLoading && (
              <p className="text-muted-foreground text-sm">
                Please wait while we activate your account.
              </p>
            )}
            {isError && (
              <>
                <p className="mt-4 text-sm text-red-500">
                  {activationError?.data.detail}, you're account is already
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
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
