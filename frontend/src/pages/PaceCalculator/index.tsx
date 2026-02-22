import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NumberField } from '../../components/NumberField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form } from 'formik';
import { object, number, string } from 'yup';

export function PaceCalculatorPage() {
  const initialValues = {
    min: 5,
    sec: 0,
    units: 'mi',
    percentage: 80,
  };

  const validationSchema = object({
    min: number()
      .required('Minutes are required')
      .min(2, 'Minimum pace is 2 minutes per mile'),
    sec: number()
      .required('Seconds are required')
      .min(0, 'Seconds must be between 0 and 59')
      .max(59, 'Seconds must be between 0 and 59'),
    units: string().required('Units are required').oneOf(['mi', 'km']),
    percentage: number()
      .required('Percentage is required')
      .min(1, 'Percentage must be greater than or equal to 1'),
  });

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Pace Calculator</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, isValid }) => (
          <Form>
            <Stack spacing={4} alignItems="center">
              <Stack direction="row" spacing={4} justifyContent="center">
                <NumberField
                  label="min"
                  min={2}
                  name="min"
                  value={values.min}
                />
                <NumberField
                  label="sec"
                  min={0}
                  max={59}
                  name="sec"
                  value={values.sec}
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
                    <MenuItem value={'mi'}>min/mi</MenuItem>
                    <MenuItem value={'km'}>min/km</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <NumberField
                label="Pecentage"
                min={1}
                name="percentage"
                value={values.percentage}
              />
              <Button type="submit" variant="contained" disabled={!isValid}>
                Calculate
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
