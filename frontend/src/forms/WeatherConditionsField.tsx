import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '@/components/ui/autocomplete';

const WEATHER_CONDITIONS = [
  'Sunny',
  'Partly Cloudy',
  'Cloudy',
  'Rainy',
  'Windy',
  'Snowy',
  'Foggy',
  'Other',
];

interface WeatherConditionsFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
}

export const WeatherConditionsField = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
  disabled,
}: WeatherConditionsFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Conditions</FieldLabel>
          <Autocomplete
            items={WEATHER_CONDITIONS}
            disabled={disabled}
            value={field.value ?? ''}
            onValueChange={field.onChange}
            autoHighlight
          >
            <AutocompleteInput
              id={`${formId}-${name}`}
              className="w-full max-w-48"
              onBlur={field.onBlur}
            />

            <AutocompleteContent>
              <AutocompleteEmpty>
                No weather conditions found.
              </AutocompleteEmpty>
              <AutocompleteList>
                {(activity) => (
                  <AutocompleteItem key={activity} value={activity}>
                    {activity}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
