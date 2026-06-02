import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { apiClient, type ApiError } from '@/lib/fetcher';

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
  path: string,
  { arg }: { arg: PaceCalculatorFormValues },
): Promise<PaceCalculationResult> {
  const response = await apiClient<{
    pace_calculation: PaceCalculationResult;
  }>('POST', path, {
    pace_calculation: arg,
  });
  return response!.pace_calculation;
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
    ApiError,
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
