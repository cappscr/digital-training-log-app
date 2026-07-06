import useSWRMutation from 'swr/mutation';
import { apiClient, type ApiError } from '@/lib/fetcher';

export interface GetNewActivationLinkRequestBody {
  email: string;
}

async function sendGetNewActivationLinkRequest(
  path: string,
  { arg }: { arg: GetNewActivationLinkRequestBody },
): Promise<{ message: string }> {
  const response = await apiClient<{ message: string }>('POST', path, arg);
  return response!;
}

export function useGetNewActivationLink() {
  const { trigger, data, error, isMutating } = useSWRMutation<
    { message: string },
    ApiError,
    string,
    GetNewActivationLinkRequestBody
  >('/account-activation', sendGetNewActivationLinkRequest, {
    populateCache: true,
    revalidate: false,
  });

  return {
    getNewActivationLink: trigger,
    result: data,
    error,
    isMutating,
  };
}
