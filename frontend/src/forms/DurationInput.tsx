import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface DurationInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
}

export const DurationInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
}: DurationInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Duration</FieldLabel>
          <Input
            type="text"
            {...field}
            className="tabular-nums"
            id={`${formId}-${name}`}
            aria-invalid={fieldState.invalid}
            autoComplete="number"
          />
          <FieldDescription>
            Hours, minutes, and seconds — e.g. 1:30:00 or 45:30
          </FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
