import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NumberField } from '../../components/NumberField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik, Form } from 'formik';

export function PaceCalculatorPage() {
  const initialValues = {
    min: 5,
    sec: 0,
    units: 'mi',
  };

  return (
    <Stack>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <Typography variant="h4">Pace Calculator</Typography>
            <NumberField
              label="min"
              min={2}
              max={20}
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
            <FormControl fullWidth>
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
            <Button type="submit" variant="contained">
              Calculate
            </Button>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}
