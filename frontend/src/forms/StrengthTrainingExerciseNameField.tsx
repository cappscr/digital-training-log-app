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

const STRENGTH_TRAINING_EXERCISE_NAMES = [
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Pull-Up',
  'Push-Up',
  'RDL',
  'Single Leg Calf Raise',
  'Split Squat',
  'Squat',
  'Trap Bar Deadlift',
];

interface StrengthTrainingExerciseNameField<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  name: FieldPath<TFieldValues>;
  disabled?: boolean;
}

export const StrengthTrainingExerciseNameField = <
  TFieldValues extends FieldValues,
>({
  control,
  formId,
  name,
  disabled,
}: StrengthTrainingExerciseNameField<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${formId}-${name}`}>Name</FieldLabel>
          <Autocomplete
            items={STRENGTH_TRAINING_EXERCISE_NAMES}
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
              <AutocompleteEmpty>No exercises found.</AutocompleteEmpty>
              <AutocompleteList>
                {(exercise) => (
                  <AutocompleteItem key={exercise} value={exercise}>
                    {exercise}
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
