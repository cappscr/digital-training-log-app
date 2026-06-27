import useSWRMutation from 'swr/mutation';
import type { User } from './useCurrentUser';
import { apiClient, type ApiError } from '@/lib/fetcher';

export interface ActivateAccountRequestBody {
  email: string;
}

async function sendActivateAccountRequest(
  path: string,
  { arg }: { arg: ActivateAccountRequestBody },
): Promise<User> {
  const response = await apiClient<User>('PATCH', path, arg);
  return response!;
}

export function useActivateAccount(token: string | null) {
  const { trigger, data, error, isMutating } = useSWRMutation<
    User,
    ApiError,
    string,
    ActivateAccountRequestBody
  >(`/account-activation/${token}`, sendActivateAccountRequest, {
    populateCache: true,
    revalidate: false,
  });

  return {
    activateAccount: trigger,
    result: data,
    error,
    isLoading: isMutating,
  };
}
