import { mutate } from 'swr';
import { useMatches, useNavigate } from 'react-router';
import { CURRENT_USER_KEY } from '@/hooks/useCurrentUser';
import { apiClient } from '@/lib/fetcher';
import { clearAccessToken } from '@/lib/auth';
import { hasHandle } from '@/lib/routeHelpers';

export function useLogout() {
  const navigate = useNavigate();
  const matches = useMatches();
  const redirectTo = matches.findLast(hasHandle)?.handle.publicPath ?? '/';

  const logout = async () => {
    try {
      await apiClient('DELETE', '/logout');
    } catch {
      // proceed with client-side logout even if the API call fails
    } finally {
      clearAccessToken();
      await mutate(CURRENT_USER_KEY, null, false);
      navigate(redirectTo);
    }
  };

  return { logout };
}
