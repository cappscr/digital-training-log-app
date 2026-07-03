import { AuthFormPageLayout } from '@/layouts/AuthFormPageLayout';
import { ResetPasswordForm } from '@/forms/ResetPassword';

export const ResetPasswordPage = () => {
  return (
    <AuthFormPageLayout
      pageName="Reset Password"
      title="Reset Password"
      caption="Enter your new password below."
    >
      <ResetPasswordForm />
    </AuthFormPageLayout>
  );
};
