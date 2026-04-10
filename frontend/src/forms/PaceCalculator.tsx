import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertError } from '@/components/AlertError';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';
import { NumberField } from '@/components/NumberField';
import { Button } from '@/components/ui/button';
import { usePaceCalculator } from '@/hooks/usePaceCalculator';
import axios from 'axios';

const UNEXPECTED_ERROR_MESSAGE =
  'An unexpected error occurred. Please try again later.';

const formSchema = z.object({
  minutes: z.number('Please enter a number').min(2, 'Enter at least 2 minutes'),
  seconds: z
    .number('Please enter a number')
    .min(0, 'Enter seconds between 0 and 59')
    .max(59, 'Enter seconds between 0 and 59'),
  units: z.enum(['per_mile', 'per_km']),
  percentage: z
    .number('Please enter a number')
    .min(1, 'Enter a percentage of at least 1'),
});

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

export const PaceCalculatorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minutes: 5,
      seconds: 0,
      units: 'per_mile',
      percentage: 80,
    },
    mode: 'onTouched',
  });

  const { calculate, isCalculating } = usePaceCalculator();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await calculate(data, { populateCache: true });
    } catch (apiError) {
      if (axios.isAxiosError(apiError) && apiError.response?.data) {
        form.setError('root', {
          message:
            apiError.response?.data.errors[0] || UNEXPECTED_ERROR_MESSAGE,
        });
      } else {
        form.setError('root', { message: UNEXPECTED_ERROR_MESSAGE });
      }
    }
  }

  return (
    <>
      {form.formState.errors.root && (
        <div className="mb-4">
          <AlertError
            title="Error"
            description={form.formState.errors.root.message ?? ''}
          />
        </div>
      )}
      <form id="pace-calculator-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-8">
          <FieldGroup>
            <div className="flex flex-row justify-center gap-4">
              <NumberField
                name="minutes"
                control={form.control}
                label="min"
                id="pace-calculator-form-min"
                min={2}
                size="icon-sm"
              />
              <NumberField
                name="seconds"
                control={form.control}
                label="sec"
                id="pace-calculator-form-sec"
                min={0}
                max={59}
                size="icon-sm"
              />
              <Controller
                name="units"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="pace-calculator-form-units">
                      Units
                    </FieldLabel>
                    <Select
                      {...field}
                      id="pace-units-select"
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      items={paceUnitOptions}
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
                )}
              />
            </div>
            <NumberField
              name="percentage"
              control={form.control}
              label="Pecentage"
              min={1}
              size="icon-xs"
            />
          </FieldGroup>
          <Button
            type="submit"
            form="pace-calculator-form"
            variant="accent"
            size="xl"
            disabled={isCalculating || !form.formState.isValid}
            radius="xs"
            className="self-stretch"
          >
            Calculate
          </Button>
        </div>
      </form>
    </>
  );
};
