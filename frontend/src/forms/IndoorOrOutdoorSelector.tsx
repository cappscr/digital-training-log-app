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
  { label: 'Indoor', value: 'indoor' },
  { label: 'Outdoor', value: 'outdoor' },
];

interface IndoorOrOutdoorSelectorProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
}

export const IndoorOrOutdoorSelector = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
}: IndoorOrOutdoorSelectorProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>
            Indoor or Outdoor
          </FieldLabel>
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
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Indoor or Outdoor</SelectLabel>
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
