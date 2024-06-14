import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { Formik } from 'formik'
import * as Yup from 'yup'

interface ForgotPasswordFormProps {
  setResetCodeSent(arg0: boolean): void
  setUsername(arg0: string): void
}

export const ForgotPasswordForm = ({
  setResetCodeSent,
  setUsername,
}: ForgotPasswordFormProps) => {
  const baseUrl = process.env.REACT_APP_API_URI

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
      }}
      onSubmit={async (values) => {
        setUsername(values.username)
        const response = await axios.put(`${baseUrl}/api/forgot-password`, {
          ...values,
        })
        if (response.status === 200) {
          setResetCodeSent(true)
        }
        // else if handle error
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email address is required to reset password'),
        username: Yup.string().required(
          'Username is required to reset password'
        ),
      })}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group
              as={Col}
              md="6"
              lg="4"
              controlId="username"
              className="mb-3"
            >
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="usernamePrepend">@</InputGroup.Text>
                <Form.Control
                  autoComplete="username"
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
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                autoComplete="email"
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
            </Form.Group>
          </Row>

          <Button type="submit" disabled={isSubmitting}>
            Get Reset Code
          </Button>
        </Form>
      )}
    </Formik>
  )
}
