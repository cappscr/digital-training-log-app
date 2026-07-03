import { PageTitle } from '@/components/PageTitle';
import { ForgotPasswordForm } from '@/forms/ForgotPassword';

export const ForgotPasswordPage = () => {
  return (
    <>
      <PageTitle pageName="Forgot Password" />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-3xl">Forgot Password</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email address below and we'll send you a link to reset
              your password.
            </p>
          </div>
          <div className="w-full">
            <ForgotPasswordForm />
          </div>
        </div>
      </section>
    </>
  );
};
