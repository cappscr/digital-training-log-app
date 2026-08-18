import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

const typeOptions = [
  { label: 'Running', value: 'run' },
  { label: 'Strength Training', value: 'strength' },
  { label: 'Cross Training', value: 'cross_training' },
];

interface SportSelectorFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
}

export const SportSelectorField = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
}: SportSelectorFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Sport</FieldLabel>
          <Select
            {...field}
            id={`${formId}-${name}`}
            onValueChange={field.onChange}
            items={typeOptions}
          >
            <SelectTrigger
              className="w-full max-w-48"
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sport</SelectLabel>
                {typeOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
