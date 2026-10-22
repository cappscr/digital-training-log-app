import {
  Controller,
  useWatch,
  type Control,
  type UseFormSetValue,
} from 'react-hook-form';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';
import { IntegerInputWithHiddenLabel } from '../IntegerInputWithHiddenLabel';
import { WeightInput } from '../WeightInput';
import type { StrengthFormValues } from './logTrainingSessionSchemas';

type SchemePath = `exercises.${number}.schemes.${number}`;

interface StrengthExerciseSetRepWeightSchemeProps {
  control: Control<StrengthFormValues>;
  setValue: UseFormSetValue<StrengthFormValues>;
  formId: string;
  schemePath: SchemePath;
  onRemove: () => void;
}

export const StrengthExerciseSetRepWeightScheme = ({
  control,
  setValue,
  formId,
  schemePath,
  onRemove,
}: StrengthExerciseSetRepWeightSchemeProps) => {
  const bodyweightId = `${formId}-${schemePath}-bodyweight`;
  const bodyweight = useWatch({ control, name: `${schemePath}.bodyweight` });

  return (
    <div className="col-span-full grid grid-cols-subgrid">
      <IntegerInputWithHiddenLabel
        control={control}
        formId="log-workout-form"
        label="Sets"
        name={`${schemePath}.sets`}
      />
      <IntegerInputWithHiddenLabel
        control={control}
        formId="log-workout-form"
        label="Reps"
        name={`${schemePath}.reps`}
      />
      <Controller
        control={control}
        name={`${schemePath}.bodyweight`}
        render={({ field }) => (
          <Field className="col-span-1 items-center justify-center">
            <Switch
              id={bodyweightId}
              checked={field.value ?? false}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                if (checked) {
                  setValue(`${schemePath}.weight`, undefined);
                  setValue(`${schemePath}.weight_unit`, undefined);
                }
              }}
            />
          </Field>
        )}
      />
      {bodyweight ? (
        <div className="col-span-2" />
      ) : (
        <WeightInput
          control={control}
          formId={formId}
          weightName={`${schemePath}.weight`}
          unitName={`${schemePath}.weight_unit`}
        />
      )}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Remove Set"
        onClick={onRemove}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
