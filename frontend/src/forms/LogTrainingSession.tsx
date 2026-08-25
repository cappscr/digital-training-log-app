import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DateAndTimePicker } from './DateAndTimePicker';
import { DistanceInput } from './DistanceInput';
import { DurationInput } from './DurationInput';
import { IndoorOrOutdoorSelector } from './IndoorOrOutdoorSelector';
import { IntegerInput } from './IntegerInput';
import { SportSelectorField } from './SportSelectorField';
import { formatPace, parseDuration } from '@/lib/utils';

const formSchema = z.object({
  date: z.date({ error: 'Select a date' }),
  time: z.string().optional(),
  type: z.enum(['run', 'strength', 'cross-training']),
  indoor_or_outdoor: z.enum(['indoor', 'outdoor']),
  duration: z
    .string('Enter a duration')
    .min(1, 'Enter a duration')
    .refine((value) => parseDuration(value) !== null, {
      message: 'Enter a valid duration (e.g. 1:30:00 or 45:30)',
    }),
  notes: z.string().optional(),
  distance: z
    .number({ error: 'Enter a distance' })
    .positive('Distance must be greater than 0')
    .optional()
    .refine((n) => n === undefined || Math.round(n * 100) / 100 === n, {
      message: 'Use at most two decimal places',
    }),
  unit: z.enum(['mi', 'km']),
  elevation_gain: z.number({ error: 'Enter an elevation gain' }).optional(),
  average_heart_rate: z.number({ error: 'Enter a heart rate' }).optional(),
  average_cadence: z.number({ error: 'Enter a cadence' }).optional(),
});

export const LogTrainingSessionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      indoor_or_outdoor: 'outdoor',
      duration: '',
      notes: '',
      time: '',
      type: 'run',
      distance: undefined,
      unit: 'mi',
    },
    mode: 'onTouched',
  });

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

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form
      id="log-workout-form"
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <DateAndTimePicker
        control={form.control}
        formId="log-workout-form"
        dateName="date"
        timeName="time"
      />
      <FieldGroup>
        <SportSelectorField
          control={form.control}
          formId="log-workout-form"
          name="type"
        />
        <IndoorOrOutdoorSelector
          control={form.control}
          formId="log-workout-form"
          name="indoor_or_outdoor"
        />
        <DurationInput
          control={form.control}
          formId="log-workout-form"
          name="duration"
        />
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="log-workout-form-notes">Notes</FieldLabel>
              <Textarea
                {...field}
                id="log-workout-form-notes"
                aria-invalid={fieldState.invalid}
                placeholder="Add any notes about the workout"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
      </FieldGroup>
    </form>
  );
};
