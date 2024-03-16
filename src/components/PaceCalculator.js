import { useState, Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { PacesTable } from '../components/PacesTable';
import { PaceCalculatorForm } from '../components/PaceCalculatorForm';

export const PaceCalculator = () => {
  const [paces, setPaces] = useState(null);

  return (
    <Fragment>
      {paces ? (
        <Container>
          <PacesTable trainingPaces={paces} />
          <Button
            variant="primary"
            onClick={() => {
              setPaces(null);
            }}
          >
            Reset
          </Button>
        </Container>
      ) : (
        <PaceCalculatorForm onSubmit={setPaces} />
      )}
    </Fragment>
  );
}