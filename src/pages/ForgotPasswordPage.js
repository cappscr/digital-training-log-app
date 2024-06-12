import Container from 'react-bootstrap/Container';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { Layout } from '../components/Layout';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useState, useEffect } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';

export const ForgotPasswordPage = () => {
  const forgotPasswordPageName = 'Digital Training Log App | Forgot Password';
  const resetPasswordPageName = 'Digital Training Log App | Reset Password';
  const analytics = getAnalytics();

  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = (resetCodeSent) ? resetPasswordPageName : forgotPasswordPageName;
    if (resetCodeSent) logEvent(analytics, 'page_view', { page_title: forgotPasswordPageName, page_location: document.location.href})
  }, [resetCodeSent, analytics]);

  return (
    <Layout>
      <Container className="my-3 d-flex justify-content-center">
        <h1>
          <i className="bi bi-shield-lock-fill mx-1"></i>
          {resetCodeSent ? 'Reset Password' : 'Forgot Password'}
        </h1>
      </Container>
      <Container className="px-5">
        {resetCodeSent
          ? <ResetPasswordForm username={username} />
          : <ForgotPasswordForm setResetCodeSent={setResetCodeSent} setUsername={setUsername}/>
        }
      </Container>
    </Layout>
  );
}