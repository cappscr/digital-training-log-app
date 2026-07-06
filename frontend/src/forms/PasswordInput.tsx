import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toKebabCase } from '@/lib/utils';

interface PasswordInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  formId: string;
  autoCompleteType: 'new' | 'current';
  labelOverride?: string;
}

export const PasswordInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
  autoCompleteType,
  labelOverride,
}: PasswordInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${toKebabCase(name)}`}>
            {labelOverride || 'Password'}
          </FieldLabel>
          <Input
            {...field}
            type="password"
            id={`${formId}-${toKebabCase(name)}`}
            aria-invalid={fieldState.invalid}
            autoComplete={`${autoCompleteType}-password`}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
