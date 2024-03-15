import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const PaceInput = () => {
  return (
    <>
      <Form.Label htmlFor="pace">Pace</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control name="pace-min" id="pace-min" type="number" />
        <InputGroup.Text htmlFor="pace-min">Min</InputGroup.Text>
        <Form.Control name="pace-sec" id="pace-sec" type="number" />
        <InputGroup.Text htmlFor="pace-sec">Sec</InputGroup.Text>
        <Form.Select name="pace-units" id="pace-units">
          <option value="mi">min/mi</option>
          <option value="km">min/km</option>
        </Form.Select>
      </InputGroup>
    </>
  );
}