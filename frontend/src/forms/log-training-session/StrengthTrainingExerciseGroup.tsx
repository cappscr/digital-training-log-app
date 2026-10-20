import {
  useFieldArray,
  type Control,
  type UseFormSetValue,
} from 'react-hook-form';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldSet } from '@/components/ui/field';
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

  return (
    <FieldSet>
      <StrengthTrainingExerciseNameField
        control={control}
        formId="log-workout-form"
        name={`exercises.${index}.name`}
      />
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
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ sets: 1, reps: 1, bodyweight: false })}
      >
        <PlusIcon data-icon="inline-start" />
        Add Set(s)
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-label="Remove Exercise"
        onClick={onRemove}
      >
        <TrashIcon />
      </Button>
    </FieldSet>
  );
};
