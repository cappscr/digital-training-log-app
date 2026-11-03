import { useMemo } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { DistanceInput } from '../DistanceInput';
import { IntegerInput } from '../IntegerInput';
import { CrossTrainingActivityField } from '../CrossTrainingActivityField';
import { ElevationGainInput } from '../ElevationGainInput';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatPace, parseDuration } from '@/lib/utils';
import type {
  DefaultUnits,
  LogTrainingSessionFormValues,
} from './logTrainingSessionSchemas';

interface CrossTrainingFieldsProps {
  defaultUnits: DefaultUnits;
  form: UseFormReturn<LogTrainingSessionFormValues>;
}

export const CrossTrainingFields = ({
  defaultUnits,
  form,
}: CrossTrainingFieldsProps) => {
  const [duration, distance, unit] = useWatch({
    control: form.control,
    name: ['duration', 'distance', 'unit'],
  });

  const paceDisplay = useMemo(() => {
    const durationInSeconds = parseDuration(duration);
    if (!durationInSeconds || !distance || !unit || distance <= 0) return '';

    const paceSecondsPerUnit = durationInSeconds / distance;
    const minutes = Math.floor(paceSecondsPerUnit / 60);
    const seconds = Math.round(paceSecondsPerUnit % 60);

    if (seconds === 60) {
      return formatPace(minutes + 1, 0, unit);
    }

    return formatPace(minutes, seconds, unit);
  }, [duration, distance, unit]);

  return (
    <>
      <CrossTrainingActivityField
        control={form.control}
        formId="log-workout-form"
        name="activity"
      />
      <DistanceInput
        control={form.control}
        defaultUnit={defaultUnits.distance}
        distanceName="distance"
        formId="log-workout-form"
        getValues={form.getValues}
        setValue={form.setValue}
        unitName="unit"
      />
      <Field>
        <FieldLabel htmlFor="log-workout-form-pace">Pace</FieldLabel>
        <Input
          type="text"
          id="log-workout-form-pace"
          disabled
          value={paceDisplay}
          placeholder="-"
        />
      </Field>
      <ElevationGainInput<LogTrainingSessionFormValues>
        control={form.control}
        defaultUnit={defaultUnits.elevation}
        elevationGainName="elevation_gain"
        formId="log-workout-form"
        getValues={form.getValues}
        setValue={form.setValue}
        unitName="elevation_unit"
      />
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Average Heart Rate"
        name="average_heart_rate"
      />
    </>
  );
};
