import { useParams } from 'react-router';
import { useUser } from '../../hooks/useUser';
import Typography from '@mui/material/Typography';

import { PageTitle } from '@/components/PageTitle';
import { UserSidebar } from '@/components/UserSidebar';

export function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user, error, isLoading } = useUser(id!);

  return isLoading ? (
    <p className="text-xl">Loading...</p>
  ) : error ? (
    <p className="text-xl">Error loading user data.</p>
  ) : (
    <>
      <PageTitle pageName={user?.name || 'User Profile'} />
      <UserSidebar userId={id!} />
      <Typography variant="h4">User Profile Page</Typography>
    </>
  );
}
