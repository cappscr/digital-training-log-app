import useSWR from 'swr';

export type User = {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  gravatar_id: string;
};

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR<{ user: User }>(`/users/${id}`);
  const { user } = data ?? {};

  return {
    user,
    error,
    isLoading,
  };
}
