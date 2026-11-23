import {
  Controller,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type UseFormGetValues,
  type UseFormSetValue,
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
  { label: 'F', value: 'f' },
  { label: 'C', value: 'c' },
];

interface TemperatureInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  defaultUnit: 'f' | 'c';
  temperatureName: FieldPath<TFieldValues>;
  formId: string;
  getValues: UseFormGetValues<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  unitName: FieldPath<TFieldValues>;
}

export const TemperatureInput = <TFieldValues extends FieldValues>({
  control,
  defaultUnit,
  formId,
  getValues,
  setValue,
  temperatureName,
  unitName,
}: TemperatureInputProps<TFieldValues>) => {
  return (
    <FieldGroup className="grid grid-cols-2 gap-4">
      <Controller
        name={temperatureName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${temperatureName}`}>
              Temperature
            </FieldLabel>
            <Input
              {...field}
              className="tabular-nums"
              inputMode="decimal"
              autoComplete="off"
              type="number"
              step="0.1"
              id={`${formId}-${temperatureName}`}
              ref={field.ref}
              onChange={(e) => {
                const { value, valueAsNumber } = e.target;
                const next = value === '' ? null : valueAsNumber;
                field.onChange(next);

                const setUnit = (unit: 'f' | 'c' | null) => {
                  setValue(
                    unitName,
                    unit as FieldPathValue<TFieldValues, typeof unitName>,
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    },
                  );
                };

                if (next === null) {
                  setUnit(null);
                  return;
                }

                if (Number.isFinite(next) && getValues(unitName) == null) {
                  setUnit(defaultUnit);
                }
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
        rules={{ deps: [temperatureName] }}
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
