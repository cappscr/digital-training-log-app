import useSWR from 'swr';

export type UserSettings = {
  microcycle_start_day: 'sunday' | 'monday';
  default_distance_unit: 'km' | 'mi';
  default_weight_unit: 'kg' | 'lbs';
  default_elevation_unit: 'm' | 'ft';
  theme: 'light' | 'dark' | 'system';
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  gravatar_id: string;
  activated: boolean;
  activated_at: string | null;
  settings: UserSettings;
};

export const CURRENT_USER_KEY = '/users/me';

export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR<{ user: User }>(
    CURRENT_USER_KEY,
  );

  return {
    user: data?.user ?? null,
    isAuthenticated: !!data?.user,
    error,
    isLoading,
    mutate,
  };
}
