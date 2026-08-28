import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface IntegerInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  label: string;
  name: FieldPath<TFieldValues>;
  formId: string;
}

export const IntegerInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  label,
  name,
}: IntegerInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            type="number"
            id={`${formId}-${name}`}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ''}
            onChange={(e) => {
              const { value, valueAsNumber } = e.target;
              field.onChange(value === '' ? undefined : valueAsNumber);
            }}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
