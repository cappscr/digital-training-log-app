import type { UseFormReturn } from 'react-hook-form';
import { TemperatureInput } from '../TemperatureInput';
import { IntegerInput } from '../IntegerInput';
import { WeatherConditionsField } from '../WeatherConditionsField';
import type { LogTrainingSessionFormValues } from './logTrainingSessionSchemas';

interface WeatherFieldsProps {
  defaultUnit: 'f' | 'c';
  form: UseFormReturn<LogTrainingSessionFormValues>;
}

export const WeatherFields = ({ defaultUnit, form }: WeatherFieldsProps) => {
  return (
    <>
      <TemperatureInput
        control={form.control}
        defaultUnit={defaultUnit}
        temperatureName="temperature"
        formId="log-workout-form"
        getValues={form.getValues}
        setValue={form.setValue}
        unitName="temperature_unit"
      />
      <IntegerInput
        control={form.control}
        formId="log-workout-form"
        label="Humidity (%)"
        name="humidity"
      />
      <WeatherConditionsField
        control={form.control}
        formId="log-workout-form"
        name="conditions"
      />
    </>
  );
};
