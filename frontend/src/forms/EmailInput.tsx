import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface EmailInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  formId: string;
  disabled?: boolean;
  description?: string;
}

export const EmailInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
  description,
  disabled = false,
}: EmailInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Email</FieldLabel>
          <Input
            {...field}
            type="email"
            id={`${formId}-${name}`}
            aria-invalid={fieldState.invalid}
            autoComplete="email"
            disabled={disabled}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
