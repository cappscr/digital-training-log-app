import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PaceInput } from '../components/PaceInput';
import { PacePercentagesSelection } from '../components/PacePercentagesSelection';
import { Pace } from '../lib/pace';

export const PaceCalculatorForm = ({ onSubmit }) => {
  const [inputPace, setInputPace] = useState(new Pace(0, 0, 'mi'));
  const [selectedPercentages, setSelectedPercentages] = useState({});

  return (
    <Form className="mx-3">
      <PaceInput
        paceMin={inputPace.min}
        paceSec={inputPace.sec}
        units={inputPace.units}
        setPace={setInputPace}
      />
      <PacePercentagesSelection
        selectedPercentages={selectedPercentages}
        onToggle={setSelectedPercentages}
      />
      <Button
        type="submit"
        variant="primary"
        onClick={e => {
          e.preventDefault();
          onSubmit({
            pace: inputPace,
            percentages: selectedPercentages,
          });
        }}
      >
        Calculate
      </Button>
    </Form>
  );
}