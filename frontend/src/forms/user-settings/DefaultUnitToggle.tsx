import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DefaultUnitToggleProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  formId: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}

export const DefaultUnitToggle = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  formId,
  label,
  name,
  options,
}: DefaultUnitToggleProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={`${formId}-${name}`}>{label}</FieldLabel>
          <ToggleGroup
            defaultValue={[defaultValue]}
            multiple={false}
            onValueChange={(value) => field.onChange(value[0])}
            spacing={0}
            value={field.value ? [field.value] : [defaultValue]}
            variant="outline"
          >
            {options.map((option) => (
              <ToggleGroupItem value={option.value} key={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
      )}
    />
  );
};
