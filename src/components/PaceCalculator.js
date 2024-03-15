import { useState, Fragment } from 'react';

import Button from 'react-bootstrap/Button';

import { PacesTable } from '../components/PacesTable';
import { PaceCalculatorForm } from '../components/PaceCalculatorForm';

export const PaceCalculator = () => {
  const [paces, setPaces] = useState(null);

  return (
    <Fragment>
      {paces ? (
        <>
          <PacesTable trainingPaces={paces} />
          <Button
            variant="primary"
            onClick={() => {
              setPaces(null);
            }}
          >
            Reset
          </Button>
        </>
      ) : (
        <PaceCalculatorForm action={setPaces} />
      )}
    </Fragment>
  );
}