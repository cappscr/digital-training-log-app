import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

export const SignUpForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        password: Yup.string().min(8, 'Password must be at least 8 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+=]).{8,}$/, 'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character').required('Required'),
        username: Yup.string().required(),
      })}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="email">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.username && !errors.username}
            isInvalid={touched.username && !!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          <Form.Label htmlFor="email">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.email && !errors.email}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.password && !errors.password}
            isInvalid={touched.password && !!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form>
      )}
    </Formik>
  );
}