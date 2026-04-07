import { useParams } from 'react-router';
import { useUser } from '../../hooks/useUser';

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
      <div className="flex flex-row">
        <UserSidebar userId={id!} />
        <h1 className="font-display mt-10 px-8 text-5xl">
          <em className="text-primary">User Profile</em> Page
        </h1>
      </div>
    </>
  );
}
