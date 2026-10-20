import {
  useFieldArray,
  type Control,
  type UseFormReturn,
  type UseFormSetValue,
} from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { IntegerInput } from '../IntegerInput';
import { StrengthTrainingExerciseGroup } from './StrengthTrainingExerciseGroup';
import type {
  LogTrainingSessionFormValues,
  StrengthFormValues,
} from './logTrainingSessionSchemas';
import { blankStrengthExerciseScheme } from './logTrainingSessionDefaultValues';

interface StrengthFieldsProps {
  form: UseFormReturn<LogTrainingSessionFormValues>;
}

export const StrengthFields = ({ form }: StrengthFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exercises',
  });

  return (
    <>
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Average Heart Rate"
        name="average_heart_rate"
      />
      <Field>
        <FieldLabel htmlFor="log-workout-form-exercises">Exercises</FieldLabel>
        {fields.map((field, index) => (
          <StrengthTrainingExerciseGroup
            key={field.id}
            control={form.control as Control<StrengthFormValues>}
            index={index}
            setValue={form.setValue as UseFormSetValue<StrengthFormValues>}
            onRemove={() => remove(index)}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({ name: '', schemes: [blankStrengthExerciseScheme()] })
          }
        >
          <PlusIcon data-icon="inline-start" /> Add Exercise
        </Button>
      </Field>
    </>
  );
};
