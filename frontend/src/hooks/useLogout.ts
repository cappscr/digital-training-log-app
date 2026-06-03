import { mutate } from 'swr';
import { useNavigate } from 'react-router';
import { apiClient } from '@/lib/fetcher';
import { clearAccessToken } from '@/lib/auth';
import { CURRENT_USER_KEY } from '@/hooks/useCurrentUser';

export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await apiClient('DELETE', '/logout');
    } catch {
      // proceed with client-side logout even if the API call fails
    } finally {
      clearAccessToken();
      await mutate(CURRENT_USER_KEY, null, false);
      navigate('/');
    }
  };

  return { logout };
}
