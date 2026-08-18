import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/components/ui/field';
import { SportSelectorField } from './SportSelectorField';

const formSchema = z.object({
  type: z.enum(['run', 'strength', 'cross-training']),
});

export const LogTrainingSessionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'run',
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <form id="log-workout-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <SportSelectorField
          control={form.control}
          formId="log-workout-form"
          name="type"
        />
      </FieldGroup>
    </form>
  );
};
