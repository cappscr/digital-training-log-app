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
  FieldDescription,
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
  { label: 'mi', value: 'mi' },
  { label: 'km', value: 'km' },
];

interface DistanceInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  defaultUnit: 'mi' | 'km';
  distanceName: FieldPath<TFieldValues>;
  formId: string;
  getValues: UseFormGetValues<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  unitName: FieldPath<TFieldValues>;
}

export const DistanceInput = <TFieldValues extends FieldValues>({
  control,
  defaultUnit,
  distanceName,
  formId,
  getValues,
  setValue,
  unitName,
}: DistanceInputProps<TFieldValues>) => {
  return (
    <FieldGroup className="grid grid-cols-2 gap-4">
      <Controller
        name={distanceName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${distanceName}`}>
              Distance
            </FieldLabel>
            <Input
              className="tabular-nums"
              type="number"
              step="0.01"
              inputMode="decimal"
              id={`${formId}-${distanceName}`}
              ref={field.ref}
              onChange={(e) => {
                const { value, valueAsNumber } = e.target;
                const next = value === '' ? null : valueAsNumber;
                field.onChange(next);

                const setUnit = (unit: 'mi' | 'km' | null) => {
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
            <FieldDescription>
              Enter the distance of the workout
            </FieldDescription>
          </Field>
        )}
      />
      <Controller
        name={unitName}
        rules={{ deps: [distanceName] }}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${unitName}`}>Units</FieldLabel>
            <Select
              {...field}
              id={`${formId}-${unitName}`}
              value={field.value ?? null}
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
