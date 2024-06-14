import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

interface Props {
  paceMin: number | string
  paceSec: number | string
  units: string
  setPaceMin(min: string): void
  setPaceSec(sec: string): void
  setUnits(units: string): void
}

export const PaceInput = ({
  paceMin,
  paceSec,
  units,
  setPaceMin,
  setPaceSec,
  setUnits,
}: Props) => {
  return (
    <>
      <Form.Label htmlFor="pace">Pace</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          name="pace-min"
          id="pace-min"
          type="number"
          value={paceMin}
          onChange={(e) => setPaceMin(e.target.value)}
        />
        <InputGroup.Text>Min</InputGroup.Text>
        <Form.Control
          name="pace-sec"
          id="pace-sec"
          type="number"
          value={paceSec}
          onChange={(e) => setPaceSec(e.target.value)}
        />
        <InputGroup.Text>Sec</InputGroup.Text>
        <Form.Select
          name="pace-units"
          id="pace-units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        >
          <option value="mi">min/mi</option>
          <option value="km">min/km</option>
        </Form.Select>
      </InputGroup>
    </>
  )
}
