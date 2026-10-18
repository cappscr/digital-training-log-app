import type { UseFormReturn } from 'react-hook-form';
import { IntegerInput } from '../IntegerInput';
import type { LogTrainingSessionFormValues } from './logTrainingSessionSchemas';

interface StrengthFieldsProps {
  form: UseFormReturn<LogTrainingSessionFormValues>;
}

export const StrengthFields = ({ form }: StrengthFieldsProps) => {
  return (
    <>
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Average Heart Rate"
        name="average_heart_rate"
      />
    </>
  );
};
