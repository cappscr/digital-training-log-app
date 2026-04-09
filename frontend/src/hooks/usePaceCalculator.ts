import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axios, { type AxiosError } from 'axios';

interface PaceCalculatorFormValues {
  minutes: number;
  seconds: number;
  units: 'per_mile' | 'per_km';
  percentage: number;
}

export interface PaceCalculationResult {
  original_pace: string;
  calculated_pace: string;
  units: 'per_mile' | 'per_km';
  percentage: number;
}

async function sendPaceRequest(
  url: string,
  { arg }: { arg: PaceCalculatorFormValues },
): Promise<PaceCalculationResult> {
  const response = await axios.post<PaceCalculationResult>(`/api/v1${url}`, {
    pace_calculation: arg,
  });
  return response.data;
}

export function usePaceResult() {
  return useSWR(
    '/pace-calculator',
    (() => undefined) as () => PaceCalculationResult | undefined,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
    },
  );
}

export function usePaceCalculator() {
  const { trigger, data, error, isMutating } = useSWRMutation<
    PaceCalculationResult,
    AxiosError<{ errors: string[] }>,
    string,
    PaceCalculatorFormValues
  >('/pace-calculator', sendPaceRequest, {
    populateCache: true,
    revalidate: false,
  });
  const { mutate } = useSWRConfig();

  const reset = () => mutate('/pace-calculator', null, false);

  return {
    calculate: trigger,
    result: data,
    error,
    isCalculating: isMutating,
    reset,
  };
}
