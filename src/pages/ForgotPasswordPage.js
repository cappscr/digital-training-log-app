import Container from 'react-bootstrap/Container';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { Layout } from '../components/Layout';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useState } from 'react';

export const ForgotPasswordPage = () => {
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [username, setUsername] = useState('');

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