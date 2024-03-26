import Container from 'react-bootstrap/Container';
import { Layout } from "../components/Layout";
import { VerifyEmailForm } from "../components/VerifyEmailForm";

export const VerifyEmailPage = () => {
  return (
    <Layout>
      <Container className="my-3 d-flex justify-content-center">
        <h1>
          <i className="bi bi-send-check-fill mx-1"></i>
          Verify Email
        </h1>
      </Container>
      <Container className="px-5">
        <VerifyEmailForm />
      </Container>
    </Layout>
  );
}