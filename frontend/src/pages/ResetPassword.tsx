import { PageTitle } from '@/components/PageTitle';
import { ResetPasswordForm } from '@/forms/ResetPassword';

export const ResetPasswordPage = () => {
  return (
    <div>
      <PageTitle pageName="Reset Password" />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-3xl">Reset Password</h1>
            <p className="text-muted-foreground text-sm">
              Enter your new password below.
            </p>
          </div>
          <div className="w-full">
            <ResetPasswordForm />
          </div>
        </div>
      </section>
    </div>
  );
};
