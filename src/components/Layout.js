import Container from 'react-bootstrap/Container';

export const Layout = ({ children }) => {
  return (
    <Container as="main">
      {children}
    </Container>
  )
}