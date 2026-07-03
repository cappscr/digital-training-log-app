import { AuthFormPageLayout } from '@/layouts/AuthFormPageLayout';
import { ForgotPasswordForm } from '@/forms/ForgotPassword';

export const ForgotPasswordPage = () => {
  return (
    <AuthFormPageLayout
      pageName="Forgot Password"
      title="Forgot Password"
      caption="Enter your email address below and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthFormPageLayout>
  );
};
