import Container from 'react-bootstrap/Container';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { Layout } from '../components/Layout';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useState, useEffect } from 'react';

export const ForgotPasswordPage = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = (resetCodeSent) ? 'Digital Training Log App | Reset Password' : 'Digital Training Log App | Forgot Password';
  }, [resetCodeSent]);

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