import { NumberField } from '@/components/NumberField';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Formik, Form, type FormikHelpers } from 'formik';
import { usePaceCalculator } from '@/hooks/usePaceCalculator';
import {
  initialValues,
  validationSchema,
  type PaceCalculatorFormValues,
} from '@/forms/paceCalculator';
import { useTheme, useMediaQuery } from '@mui/material';
import styles from './PaceCalculatorForm.module.css';

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
          <div className={styles.container}>
            <div className={styles.formRow}>
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
              <Field>
                <FieldLabel id="pace-units-select-label">Units</FieldLabel>
                <Select
                  labelId="pace-units-select-label"
                  id="pace-units-select"
                  label="Units"
                  name="units"
                  size={isMobile ? 'medium' : 'small'}
                  value={values.units}
                  onChange={handleChange}
                >
                  <MenuItem value={'per_mile'}>per mi</MenuItem>
                  <MenuItem value={'per_km'}>per km</MenuItem>
                </Select>
              </Field>
            </div>
            <NumberField
              label="Pecentage"
              min={1}
              name="percentage"
              size="icon-xs"
              value={values.percentage}
            />
            <Button
              type="submit"
              size="xl"
              disabled={!isValid || isCalculating}
              radius="xs"
              className={styles.submitBtn}
            >
              Calculate
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
