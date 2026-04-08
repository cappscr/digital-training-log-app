import { object, number, string } from 'yup';
import * as z from 'zod';

export interface PaceCalculatorFormValues {
  minutes: number;
  seconds: number;
  units: 'per_mile' | 'per_km';
  percentage: number;
}

export const defaultValues: z.infer<typeof formSchema> = {
  minutes: 5,
  seconds: 0,
  units: 'per_mile',
  percentage: 80,
};

export const validationSchema = object({
  minutes: number().required('Enter minutes').min(1, 'Enter at least 1 minute'),
  seconds: number()
    .required('Enter seconds')
    .min(0, 'Enter seconds between 0 and 59')
    .max(59, 'Enter seconds between 0 and 59'),
  units: string().required('Select units').oneOf(['per_mile', 'per_km']),
  percentage: number()
    .required('Enter percentage')
    .min(1, 'Enter a percentage of at least 1'),
});

export const formSchema = z.object({
  minutes: z.number().min(1, 'Enter at least 1 minute'),
  seconds: z
    .number()
    .min(0, 'Enter seconds between 0 and 59')
    .max(59, 'Enter seconds between 0 and 59'),
  units: z.enum(['per_mile', 'per_km']),
  percentage: z.number().min(1, 'Enter a percentage of at least 1'),
});
