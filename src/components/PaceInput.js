import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Pace } from '../lib/pace';

export const PaceInput = ({ paceMin, paceSec, units, setPace }) => {

  return (
    <>
      <Form.Label htmlFor="pace">Pace</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          name="pace-min"
          id="pace-min"
          type="number"
          value={paceMin}
          onChange={e => setPace(
            new Pace(
              e.target.value === '' ? 0 : e.target.value,
              paceSec,
              units
            )
          )}
        />
        <InputGroup.Text htmlFor="pace-min">Min</InputGroup.Text>
        <Form.Control
          name="pace-sec"
          id="pace-sec"
          type="number"
          value={paceSec}
          onChange={e => setPace(
            new Pace(
              paceMin,
              e.target.value === '' ? 0 : e.target.value,
              units)
          )}
        />
        <InputGroup.Text htmlFor="pace-sec">Sec</InputGroup.Text>
        <Form.Select
          name="pace-units"
          id="pace-units"
          value={units}
          onChange={e => setPace(new Pace(paceMin, paceSec, e.target.value))}
        >
          <option value="mi">min/mi</option>
          <option value="km">min/km</option>
        </Form.Select>
      </InputGroup>
    </>
  );
}