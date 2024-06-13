import { useState, Fragment } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { PacesTable } from "../components/PacesTable";
import { PaceCalculatorForm } from "../components/PaceCalculatorForm";
import { getAnalytics, logEvent } from "firebase/analytics";

export const PaceCalculator = () => {
  const analytics = getAnalytics();
  const [paces, setPaces] = useState(null);

  return (
    <Fragment>
      {paces ? (
        <Container>
          <PacesTable trainingPaces={paces} />
          <Button
            variant="primary"
            onClick={() => {
              logEvent(analytics, "pace_calculator_reset", {});
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
};
