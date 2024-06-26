import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { Formik } from 'formik'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

export const SignUpForm = () => {
  const baseUrl = process.env.REACT_APP_API_URI
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        birthdate: '',
        email: '',
        firstName: '',
        gender: 'male',
        lastName: '',
        password: '',
        username: '',
      }}
      onSubmit={async (values, { resetForm }) => {
        const { email, username } = values
        const response = await axios.post(`${baseUrl}/api/signup`, {
          ...values,
          zoneinfo: timezone,
        })
        if (response.status === 200) {
          resetForm()
          navigate(
            `/verify-email?email=${encodeURIComponent(email)}&user=${username}`
          )
        }
        // TODO: Better error handling for the future
      }}
      validationSchema={Yup.object({
        birthdate: Yup.date(),
        email: Yup.string().email('Invalid email address').required('Required'),
        firstName: Yup.string().required('First name is required'),
        gender: Yup.string().matches(/male|female|non-binary/),
        lastName: Yup.string().required('Last name is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .matches(/[A-Z]/, 'Password must contain an uppercase letter')
          .matches(/[a-z]/, 'Password must contain a lowercase letter')
          .matches(/[0-9]/, 'Password must contain a digit between 0 and 9')
          .matches(
            /[\^$*.[\]{}()?\-"!@#%&\\,><':;|_~`+=]/,
            'Password must contain a special character'
          )
          .required('Required'),
        username: Yup.string().required('Username is required'),
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

          <Row>
            <Form.Group as={Col} md="4" controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoComplete="given-name"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                autoComplete="family-name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="birthdate" as={Col} md="4" className="mb-3">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                autoComplete="date"
                type="date"
                name="birthdate"
                value={values.birthdate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.birthdate && !errors.birthdate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthdate}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row></Row>

          <Row>
            <Form.Group controlId="password" as={Col} md="6" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="new-password"
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
            </Form.Group>

            <Form.Group controlId="gender" as={Col} md="4" className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select aria-label="Gender select">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  )
}
