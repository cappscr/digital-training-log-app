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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

const SPORT_KINDS = ['running', 'cross_training'];
export type SportKind = (typeof SPORT_KINDS)[number];

const typeOptions: { label: string; value: SportKind }[] = [
  { label: 'Running', value: 'running' },
  /*{ label: 'Strength Training', value: 'strength' },*/
  { label: 'Cross Training', value: 'cross_training' },
];

const isSportKind = (value: unknown): value is SportKind => {
  return typeof value === 'string' && SPORT_KINDS.includes(value as SportKind);
};

interface SportSelectorFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
  onSportChange?: (value: SportKind) => void;
}

export const SportSelectorField = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
  disabled,
  onSportChange,
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
            onValueChange={(value) => {
              if (!isSportKind(value)) return;
              field.onChange(value);
              onSportChange?.(value);
            }}
            items={typeOptions}
            disabled={disabled}
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
          {disabled && (
            <FieldDescription>
              To change the sport delete this training session and create a new
              one with the correct sport
            </FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
