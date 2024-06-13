import Container from "react-bootstrap/Container";
import { Layout } from "../components/Layout";
import { SignUpForm } from "../components/SignUpForm";
import { useEffect } from "react";

export const SignUpPage = () => {
  useEffect(() => {
    document.title = "Digital Training Log App | Sign Up";
  });

  return (
    <Layout>
      <Container className="my-3 d-flex justify-content-center">
        <h1>
          <i className="bi bi-person-fill-add mx-1"></i>
          Sign Up
        </h1>
      </Container>
      <Container className="px-5">
        <SignUpForm />
      </Container>
    </Layout>
  );
};
