import Form from 'react-bootstrap/Form';
import { trainingPercentages } from '../lib/constants';

export const PacePercentagesSelection = () => {
  const formSwitches = trainingPercentages.map((percent) => (
    <div key={percent}>
      <Form.Check type="switch" name={percent} id={percent} label={percent} />
    </div>
  ));

  return (
    <div className="mb-3">
      <Form.Label>Percentages to display</Form.Label>
      {formSwitches}
    </div>
  );
}
