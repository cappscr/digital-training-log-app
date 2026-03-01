import { NumberField } from '../../../components/NumberField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Formik, Form, type FormikHelpers } from 'formik';
import { object, number, string } from 'yup';
import {
  usePaceCalculator,
  type PaceCalculatorFormValues,
} from '../../../hooks/usePaceCalculator';

export function PaceCalculatorForm() {
  const { calculate, isCalculating } = usePaceCalculator();

  const initialValues: PaceCalculatorFormValues = {
    minutes: 5,
    seconds: 0,
    units: 'min_per_mile',
    percentage: 80,
  };

  const validationSchema = object({
    minutes: number()
      .required('Enter minutes')
      .min(1, 'Enter at least 1 minute'),
    seconds: number()
      .required('Enter seconds')
      .min(0, 'Enter seconds between 0 and 59')
      .max(59, 'Enter seconds between 0 and 59'),
    units: string()
      .required('Select units')
      .oneOf(['min_per_mile', 'min_per_km']),
    percentage: number()
      .required('Enter percentage')
      .min(1, 'Enter a percentage of at least 1'),
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, isValid }) => (
        <Form>
          <Stack spacing={4} alignItems="center">
            <Stack direction="row" spacing={2} justifyContent="center">
              <NumberField
                label="min"
                min={2}
                name="minutes"
                size="small"
                value={values.minutes}
                maxWidth={80}
              />
              <NumberField
                label="sec"
                min={0}
                max={59}
                name="seconds"
                size="small"
                value={values.seconds}
                maxWidth={80}
              />
              <FormControl>
                <InputLabel id="pace-units-select-label">Units</InputLabel>
                <Select
                  labelId="pace-units-select-label"
                  id="pace-units-select"
                  label="Units"
                  name="units"
                  size="small"
                  value={values.units}
                  onChange={handleChange}
                >
                  <MenuItem value={'min_per_mile'}>per mi</MenuItem>
                  <MenuItem value={'min_per_km'}>per km</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <NumberField
              label="Pecentage"
              min={1}
              name="percentage"
              size="small"
              value={values.percentage}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isCalculating}
              fullWidth
            >
              Calculate
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
