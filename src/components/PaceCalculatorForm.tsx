import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { PaceInput } from './PaceInput'
import { PacePercentagesSelection } from './PacePercentagesSelection'
import { Pace } from '../lib/pace'
import { getAnalytics, logEvent } from 'firebase/analytics'

export const PaceCalculatorForm = ({ onSubmit }: any) => {
  const [inputPaceMin, setInputPaceMin] = useState('')
  const [inputPaceSec, setInputPaceSec] = useState('')
  const [paceUnits, setPaceUnits] = useState('mi')
  const [selectedPercentages, setSelectedPercentages] = useState({})
  const analytics = getAnalytics()

  return (
    <Form className="mx-3">
      <PaceInput
        paceMin={inputPaceMin}
        paceSec={inputPaceSec}
        units={paceUnits}
        setPaceMin={setInputPaceMin}
        setPaceSec={setInputPaceSec}
        setUnits={setPaceUnits}
      />
      <PacePercentagesSelection
        selectedPercentages={selectedPercentages}
        onToggle={setSelectedPercentages}
      />
      <Button
        type="submit"
        variant="primary"
        onClick={(e) => {
          e.preventDefault()
          logEvent(analytics, 'calculate_paces', {
            input_pace: `${inputPaceMin}:${inputPaceSec} min/${paceUnits}`,
            selected_percentages: Object.keys(selectedPercentages).join(','),
          })
          onSubmit({
            pace: new Pace(inputPaceMin || 0, inputPaceSec || 0, paceUnits),
            percentages: selectedPercentages,
          })
        }}
      >
        Calculate
      </Button>
    </Form>
  )
}
