import { object, number, string } from 'yup';

export interface PaceCalculatorFormValues {
  minutes: number;
  seconds: number;
  units: 'min_per_mile' | 'min_per_km';
  percentage: number;
}

export const initialValues: PaceCalculatorFormValues = {
  minutes: 5,
  seconds: 0,
  units: 'min_per_mile',
  percentage: 80,
};

export const validationSchema = object({
  minutes: number().required('Enter minutes').min(1, 'Enter at least 1 minute'),
  seconds: number()
    .required('Enter seconds')
    .min(0, 'Enter seconds between 0 and 59')
    .max(59, 'Enter seconds between 0 and 59'),
  units: string()
    .required('Select units')
    .oneOf(['min_per_mile', 'min_per_km']),
  percentage: number()
    .required('Enter percentage')
    .min(1, 'Enter a percentage of at least 1'),
});
