import { useMemo } from 'react';
import { useWatch, type UseFormReturn } from 'react-hook-form';
import { DistanceInput } from '../DistanceInput';
import { IntegerInput } from '../IntegerInput';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatPace, parseDuration } from '@/lib/utils';
import type { LogTrainingSessionFormValues } from './LogTrainingSession';

interface RunningFieldsProps {
  form: UseFormReturn<LogTrainingSessionFormValues>;
}

export const RunningFields = ({ form }: RunningFieldsProps) => {
  const [duration, distance, unit] = useWatch({
    control: form.control,
    name: ['duration', 'distance', 'unit'],
  });

  const paceDisplay = useMemo(() => {
    const durationInSeconds = parseDuration(duration);
    if (!durationInSeconds || !distance || distance <= 0) return '';

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
      <DistanceInput
        control={form.control}
        formId="log-workout-form"
        distanceName="distance"
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
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Elevation Gain"
        name="elevation_gain"
      />
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Average Heart Rate"
        name="average_heart_rate"
      />
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Average Cadence"
        name="average_cadence"
      />
    </>
  );
};
