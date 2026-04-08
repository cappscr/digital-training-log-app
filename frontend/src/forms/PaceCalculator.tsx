import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertError } from '@/components/AlertError';
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { NumberField } from '@/components/NumberField';

const formSchema = z.object({
  minutes: z.number().min(1, 'Enter at least 1 minute'),
  seconds: z
    .number()
    .min(0, 'Enter seconds between 0 and 59')
    .max(59, 'Enter seconds between 0 and 59'),
  units: z.enum(['per_mile', 'per_km']),
  percentage: z.number().min(1, 'Enter a percentage of at least 1'),
});

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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
        <FieldGroup>
          <Controller
            name="minutes"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="pace-calculator-form-min">min</FieldLabel>
                <NumberField {...field} min={2} size="icon-sm" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </>
  );
};
