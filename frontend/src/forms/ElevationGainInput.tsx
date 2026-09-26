import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

const unitOptions = [
  { label: 'ft', value: 'ft' },
  { label: 'm', value: 'm' },
];

interface ElevationGainInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  elevationGainName: FieldPath<TFieldValues>;
  unitName: FieldPath<TFieldValues>;
}

export const ElevationGainInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  elevationGainName,
  unitName,
}: ElevationGainInputProps<TFieldValues>) => {
  return (
    <FieldGroup className="grid grid-cols-2 gap-4">
      <Controller
        name={elevationGainName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${elevationGainName}`}>
              Elevation Gain
            </FieldLabel>
            <Input
              {...field}
              className="tabular-nums"
              autoComplete="off"
              type="number"
              id={`${formId}-${elevationGainName}`}
              ref={field.ref}
              onChange={(e) => {
                const { value, valueAsNumber } = e.target;
                field.onChange(value === '' ? undefined : valueAsNumber);
              }}
              onBlur={field.onBlur}
              value={field.value ?? ''}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name={unitName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${unitName}`}>Units</FieldLabel>
            <Select
              {...field}
              id={`${formId}-${unitName}`}
              onValueChange={field.onChange}
              items={unitOptions}
            >
              <SelectTrigger
                className="w-full max-w-48"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Units</SelectLabel>
                  {unitOptions.map((item) => (
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
    </FieldGroup>
  );
};
