import { /* Controller, */ useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, defaultValues } from '@/forms/paceCalculatorSchema';
import * as z from 'zod';
import { AlertError } from '@/components/AlertError';
import { FieldGroup } from '@/components/ui/field';

export const PaceCalculatorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <>
      {form.formState.errors.root && (
        <div className="mb-4">
          <AlertError
            title="Error"
            description={form.formState.errors.root.message ?? ''}
          />
        </div>
      )}
      <form id="pace-calculator-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup></FieldGroup>
      </form>
    </>
  );
};
