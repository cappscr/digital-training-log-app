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

const CROSS_TRAINING_ACTIVITIES = [
  'Uphill Treadmill',
  'Aqua Jogging',
  'Cycling',
  'Swimming',
  'Elliptical',
  'Rowing',
  'Yoga',
  'Hiking',
  'Other',
];

interface CrossTrainingActivityFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
}

export const CrossTrainingActivityField = <TFieldValues extends FieldValues>({
  control,
  formId,
  name,
  disabled,
}: CrossTrainingActivityFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Activity</FieldLabel>
          <Autocomplete
            items={CROSS_TRAINING_ACTIVITIES}
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
              <AutocompleteEmpty>No activities found.</AutocompleteEmpty>
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
