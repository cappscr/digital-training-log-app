import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NumberField } from '../../components/NumberField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form, type FormikHelpers } from 'formik';
import { object, number, string } from 'yup';
import {
  type PaceCalculationResult,
  usePaceCalculator,
  type PaceCalculatorFormValues,
} from '../../hooks/usePaceCalculator';
import { PaceResultTable } from './components/PaceResultTable';
import useSWR from 'swr';

export function PaceCalculatorPage() {
  const { data: result } = useSWR<PaceCalculationResult>(
    '/api/v1/pace-calculator',
  );
  const { calculate, isCalculating } = usePaceCalculator();

  const initialValues: PaceCalculatorFormValues = {
    minutes: 5,
    seconds: 0,
    units: 'min_per_mile',
    percentage: 80,
  };

  const validationSchema = object({
    minutes: number()
      .required('Minutes are required')
      .min(2, 'Minimum pace is 2 minutes per mile'),
    seconds: number()
      .required('Seconds are required')
      .min(0, 'Seconds must be between 0 and 59')
      .max(59, 'Seconds must be between 0 and 59'),
    units: string()
      .required('Units are required')
      .oneOf(['min_per_mile', 'min_per_km']),
    percentage: number()
      .required('Percentage is required')
      .min(1, 'Percentage must be greater than or equal to 1'),
  });

  const handleSubmit = async (
    values: PaceCalculatorFormValues,
    { setStatus, setSubmitting }: FormikHelpers<PaceCalculatorFormValues>,
  ) => {
    try {
      setStatus(null);
      await calculate(values, { populateCache: true });
    } catch (apiError) {
      setStatus(apiError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Pace Calculator</Typography>
      {result ? (
        <PaceResultTable />
      ) : (
        // TODO: move into a sub-component
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isValid }) => (
            <Form>
              <Stack spacing={4} alignItems="center">
                <Stack direction="row" spacing={4} justifyContent="center">
                  <NumberField
                    label="min"
                    min={2}
                    name="minutes"
                    value={values.minutes}
                  />
                  <NumberField
                    label="sec"
                    min={0}
                    max={59}
                    name="seconds"
                    value={values.seconds}
                  />
                  <FormControl>
                    <InputLabel id="pace-units-select-label">Units</InputLabel>
                    <Select
                      labelId="pace-units-select-label"
                      id="pace-units-select"
                      label="Units"
                      name="units"
                      value={values.units}
                      onChange={handleChange}
                    >
                      <MenuItem value={'min_per_mile'}>min/mi</MenuItem>
                      <MenuItem value={'min_per_km'}>min/km</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <NumberField
                  label="Pecentage"
                  min={1}
                  name="percentage"
                  value={values.percentage}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isValid || isCalculating}
                >
                  Calculate
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </Stack>
  );
}
