import Form from 'react-bootstrap/Form'
import { trainingPercentages } from '../lib/constants'

type SelectedPercentages = {
  [key: string]: boolean
}

interface PacePercentagesSelectionProps {
  selectedPercentages: SelectedPercentages
  onToggle: any
}

export const PacePercentagesSelection = ({
  selectedPercentages,
  onToggle,
}: PacePercentagesSelectionProps) => {
  const formSwitches = trainingPercentages.map((percent) => (
    <div key={percent}>
      <Form.Check
        type="switch"
        name={percent}
        id={percent}
        label={percent}
        onChange={(e) => {
          e.target.checked
            ? (selectedPercentages[percent] = true)
            : (selectedPercentages[percent] = false)
          onToggle(selectedPercentages)
        }}
      />
    </div>
  ))

  return (
    <div className="mb-3">
      <Form.Label>Percentages to display</Form.Label>
      {formSwitches}
    </div>
  )
}
