import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import { DateAndTimePicker } from './DateAndTimePicker';
import { DurationInput } from './DurationInput';
import { SportSelectorField } from './SportSelectorField';
import { parseDuration } from '@/lib/utils';

const formSchema = z.object({
  date: z.date({ error: 'Select a date' }),
  time: z.string().optional(),
  type: z.enum(['run', 'strength', 'cross-training']),
  duration: z
    .string('Enter a duration')
    .min(1, 'Enter a duration')
    .refine((value) => parseDuration(value) !== null, {
      message: 'Enter a valid duration (e.g. 1:30:00 or 45:30)',
    }),
});

export const LogTrainingSessionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: '',
      type: 'run',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form
      id="log-workout-form"
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
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
        <DurationInput
          control={form.control}
          formId="log-workout-form"
          name="duration"
        />
      </FieldGroup>
    </form>
  );
};
