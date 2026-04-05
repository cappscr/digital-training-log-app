import { NumberField } from '@/components/NumberField';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';
import { Formik, Form, type FormikHelpers } from 'formik';
import { usePaceCalculator } from '@/hooks/usePaceCalculator';
import {
  initialValues,
  validationSchema,
  type PaceCalculatorFormValues,
} from '@/forms/paceCalculator';

export function PaceCalculatorForm() {
  const { calculate, isCalculating } = usePaceCalculator();
  const paceUnitOptions = [
    {
      label: 'per mi',
      value: 'per_mile',
    },
    {
      label: 'per km',
      value: 'per_km',
    },
  ];

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
      {({ values, setFieldValue, isValid }) => (
        <Form>
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-row justify-center gap-4">
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
                  id="pace-units-select"
                  name="units"
                  value={values.units}
                  items={paceUnitOptions}
                  onValueChange={(value) => setFieldValue('units', value)}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Units</SelectLabel>
                      {paceUnitOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
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
              className="self-stretch"
            >
              Calculate
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
