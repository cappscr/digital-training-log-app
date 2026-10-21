import {
  get,
  useFieldArray,
  useFormState,
  type Control,
  type UseFormSetValue,
} from 'react-hook-form';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { StrengthTrainingExerciseNameField } from '../StrengthTrainingExerciseNameField';
import { StrengthExerciseSetRepWeightScheme } from './StrengthExerciseSetRepWeightScheme';
import type { StrengthFormValues } from './logTrainingSessionSchemas';

interface StrengthTrainingExerciseGroupProps {
  control: Control<StrengthFormValues>;
  index: number;
  setValue: UseFormSetValue<StrengthFormValues>;
  onRemove: () => void;
}

export const StrengthTrainingExerciseGroup = ({
  control,
  index,
  setValue,
  onRemove,
}: StrengthTrainingExerciseGroupProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.schemes`,
  });

  const { errors } = useFormState({
    control,
    name: `exercises.${index}.schemes`,
  });
  const schemeError = get(errors, `exercises.${index}.schemes`);
  const schemesMessage = schemeError?.root?.message ?? schemeError?.message;

  console.log('DEBUG, ', schemeError);

  return (
    <FieldSet>
      <div className="flex flex-row items-center justify-between">
        <StrengthTrainingExerciseNameField
          control={control}
          formId="log-workout-form"
          name={`exercises.${index}.name`}
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Remove Exercise"
          onClick={onRemove}
        >
          <TrashIcon />
        </Button>
      </div>
      <FieldGroup className="grid grid-cols-[minmax(3.25rem,0.8fr)_minmax(3.25rem,0.8fr)_minmax(5.75rem,1.4fr)_minmax(0,1fr)_minmax(3.5rem,1fr)_auto] gap-2 sm:grid-cols-[4.5rem_4.5rem_max-content_minmax(0,1.5fr)_minmax(0,1fr)_auto]">
        <FieldLabel>Sets</FieldLabel>
        <FieldLabel>Reps</FieldLabel>
        <FieldLabel>Bodyweight</FieldLabel>
        <FieldLabel>Weight</FieldLabel>
        <FieldLabel>Units</FieldLabel>
        {schemeError && (
          <FieldError errors={[schemeError]} className="col-span-6" />
        )}
        {schemesMessage && (
          <FieldError
            errors={[{ message: schemesMessage }]}
            className="col-span-6"
          />
        )}
        {fields.map((field, schemeIndex) => (
          <StrengthExerciseSetRepWeightScheme
            key={field.id}
            control={control}
            schemePath={`exercises.${index}.schemes.${schemeIndex}`}
            formId="log-workout-form"
            setValue={setValue}
            onRemove={() => remove(schemeIndex)}
          />
        ))}
      </FieldGroup>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            sets: 1,
            reps: 1,
            bodyweight: true,
            weight: null,
            weight_unit: 'lbs', // customize this once user settings are implemented
            id: crypto.randomUUID(),
          })
        }
      >
        <PlusIcon data-icon="inline-start" />
        Add Set(s)
      </Button>
    </FieldSet>
  );
};
