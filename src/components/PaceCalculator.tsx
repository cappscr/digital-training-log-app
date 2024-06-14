import { useState, Fragment } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { PacesTable } from './PacesTable'
import { PaceCalculatorForm } from './PaceCalculatorForm'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { Pace } from '../lib/pace'

export const PaceCalculator = () => {
  const analytics = getAnalytics()
  const [paces, setPaces] = useState<Pace[] | null>(null)

  return (
    <Fragment>
      {paces ? (
        <Container>
          <PacesTable trainingPaces={paces} />
          <Button
            variant="primary"
            onClick={() => {
              logEvent(analytics, 'pace_calculator_reset', {})
              setPaces(null)
            }}
          >
            Reset
          </Button>
        </Container>
      ) : (
        <PaceCalculatorForm onSubmit={setPaces} />
      )}
    </Fragment>
  )
}
