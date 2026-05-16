import { useCurrentUser } from '../hooks/useCurrentUser';

import { PageTitle } from '@/components/PageTitle';
import { UserSidebar } from '@/components/UserSidebar';

export function UserProfilePage() {
  const { user, error, isLoading } = useCurrentUser();

  return isLoading ? (
    <p className="text-xl">Loading...</p>
  ) : error ? (
    <p className="text-xl">Error loading user data.</p>
  ) : (
    <>
      <PageTitle pageName={user?.name || 'User Profile'} />
      <div className="flex flex-row">
        <UserSidebar />
        <h1 className="font-display mt-10 px-8 text-5xl">
          <em className="text-primary">User Profile</em> Page
        </h1>
      </div>
    </>
  );
}
