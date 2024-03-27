import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

export const VerifyEmailForm = () => {
  const baseUrl = process.env.REACT_APP_API_URI;
  const [searchParams,] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: searchParams.get('email'),
        username: searchParams.get('user'),
        verificationCode: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        const response = await axios.put(`${baseUrl}/api/verify-email`, {
          ...values,
        });
        if (response.status === 200) {
          resetForm();
          // login user and redirect to dashboard
          navigate('/');
        }
        // else if handle error
      }}
      validationSchema={Yup.object({
        verificationCode: Yup.string().length(6, 'Verification codes are 6 characters')
      })}
    >
      {({ handleSubmit, handleChange, handleBlur, isSubmitting, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="6" controlId="emailVerificationCode" className="mb-3">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                autoComplete="one-time-code"
                type="text"
                name="verificationCode"
                value={values.verificationCode}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.verificationCode && !errors.verificationCode}
                isInvalid={touched.verificationCode && !!errors.verificationCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.verificationCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <Button type="submit" disabled={isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  );
}