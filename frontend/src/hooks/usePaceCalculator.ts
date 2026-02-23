import useSWRMutation from 'swr/mutation';
import axios, { type AxiosError } from 'axios';

export interface PaceCalculationResult {
  original_pace: string;
  calculated_pace: string;
}

export interface PaceCalculatorFormValues {
  minutes: number;
  seconds: number;
  units: 'min_per_mile' | 'min_per_km';
  percentage: number;
}

async function sendPaceRequest(
  url: string,
  { arg }: { arg: PaceCalculatorFormValues },
): Promise<PaceCalculationResult> {
  const response = await axios.post<PaceCalculationResult>(url, {
    pace_calculation: arg,
  });
  return response.data;
}

export function usePaceCalculator() {
  const { trigger, data, error, isMutating } = useSWRMutation<
    PaceCalculationResult,
    AxiosError<{ errors: string[] }>,
    string,
    PaceCalculatorFormValues
  >('/api/v1/pace-calculator', sendPaceRequest, {
    populateCache: true,
    // revalidate: false,
  });

  return {
    calculate: trigger,
    result: data,
    error,
    isCalculating: isMutating,
  };
}
