import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface MicrocycleStartDayToggleProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  formId: string;
  defaultValue: 'sunday' | 'monday';
}

export const MicrocycleStartDayToggle = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  formId,
  name,
}: MicrocycleStartDayToggleProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={`${formId}-${name}`}>
            Microcycle Start Day
          </FieldLabel>
          <ToggleGroup
            defaultValue={[defaultValue]}
            multiple={false}
            onValueChange={(value) => field.onChange(value[0])}
            spacing={0}
            value={field.value ? [field.value] : [defaultValue]}
            variant="outline"
          >
            <ToggleGroupItem value="sunday">Sunday</ToggleGroupItem>
            <ToggleGroupItem value="monday">Monday</ToggleGroupItem>
          </ToggleGroup>
        </Field>
      )}
    />
  );
};
