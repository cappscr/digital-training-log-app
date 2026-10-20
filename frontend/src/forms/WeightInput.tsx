import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldGroup, FieldError } from '@/components/ui/field';
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
  { label: 'kg', value: 'kg' },
  { label: 'lbs', value: 'lbs' },
];

interface WeightInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  weightName: FieldPath<TFieldValues>;
  unitName: FieldPath<TFieldValues>;
}

export const WeightInput = <TFieldValues extends FieldValues>({
  control,
  formId,
  weightName,
  unitName,
}: WeightInputProps<TFieldValues>) => {
  return (
    <FieldGroup className="contents">
      <Controller
        name={weightName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} aria-label="Weight">
            <Input
              className="tabular-nums"
              type="number"
              step="0.01"
              inputMode="decimal"
              id={`${formId}-${weightName}`}
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
          <Field data-invalid={fieldState.invalid} aria-label="Units">
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
