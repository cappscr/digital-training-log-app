import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PaceInput } from '../components/PaceInput';
import { PacePercentagesSelection } from '../components/PacePercentagesSelection';

export const PaceCalculatorForm = ({ action }) => {
  return (
    <Form action={action}>
      <PaceInput />
      <PacePercentagesSelection />
      <Button type="submit" variant="primary">
        Calculate
      </Button>
    </Form>
  );
}