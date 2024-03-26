import Container from 'react-bootstrap/Container';
import { Layout } from '../components/Layout';
import { PaceCalculator } from '../components/PaceCalculator';

export const PaceCalculatorPage = () => {
  return (
    <Layout>
      <Container className="d-flex justify-content-center">
        <h1 className="mt-3 mb-4">
          <i className="bi bi-calculator"></i>
          Training Paces Calulator
        </h1>
      </Container>
      <Container className="d-flex align-items-center">
        <PaceCalculator />
      </Container>
    </Layout>
  );
}