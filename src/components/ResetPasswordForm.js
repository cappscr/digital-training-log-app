import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const ResetPasswordForm = ({ username }) => {
  const baseUrl = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        newPassword: '',
        resetCode: '',
        username: username,
      }}
      onSubmit={async (values, { resetForm }) => {
        const response = await axios.put(`${baseUrl}/api/users/reset-password`, {
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
        newPassword: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain an uppercase letter')
          .matches(/[a-z]/, 'Password must contain a lowercase letter')
          .matches(/[0-9]/, 'Password must contain a digit between 0 and 9')
          .matches(/[\^$*.[\]{}()?\-"!@#%&\\,><':;|_~`+=]/, 'Password must contain a special character')
          .required('Required'),
        resetCode: Yup.string().length(6, 'Reset codes are 6 characters')
      })}
    >
      {({ handleSubmit, handleChange, handleBlur, isSubmitting, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="6" controlId="pwResetCode" className="mb-3">
              <Form.Label>Reset Code</Form.Label>
              <Form.Control
                autoComplete="one-time-code"
                type="text"
                name="resetCode"
                value={values.resetCode}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.resetCode && !errors.resetCode}
                isInvalid={touched.resetCode && !!errors.resetCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.resetCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="newPassword" as={Col} md="6" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                autoComplete="new-password"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.newPassword && !errors.newPassword}
                isInvalid={touched.newPassword && !!errors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <Button type="submit" disabled={isSubmitting}>Reset Password</Button>
        </Form>
      )}
    </Formik>
  );
}