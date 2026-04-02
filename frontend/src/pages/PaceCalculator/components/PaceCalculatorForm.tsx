import { NumberField } from '@/components/NumberField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Formik, Form, type FormikHelpers } from 'formik';
import { usePaceCalculator } from '@/hooks/usePaceCalculator';
import {
  initialValues,
  validationSchema,
  type PaceCalculatorFormValues,
} from '@/forms/paceCalculator';
import { useTheme, useMediaQuery } from '@mui/material';

export function PaceCalculatorForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { calculate, isCalculating } = usePaceCalculator();

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
          <Stack spacing={4} alignItems="flex-start">
            <Stack direction="row" spacing={2} justifyContent="center">
              <NumberField
                label="min"
                min={2}
                name="minutes"
                size="icon-sm"
                value={values.minutes}
              />
              <NumberField
                label="sec"
                min={0}
                max={59}
                name="seconds"
                size="icon-sm"
                value={values.seconds}
              />
              <FormControl>
                <InputLabel id="pace-units-select-label">Units</InputLabel>
                <Select
                  labelId="pace-units-select-label"
                  id="pace-units-select"
                  label="Units"
                  name="units"
                  size={isMobile ? 'medium' : 'small'}
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
              size="icon-xs"
              value={values.percentage}
            />
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'large' : 'small'}
              disabled={!isValid || isCalculating}
            >
              Calculate
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
