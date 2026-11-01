import { useCurrentUser } from '../hooks/useCurrentUser';

import { Loading } from '@/components/Loading';
import { PageTitle } from '@/components/PageTitle';
import { UserSettingsForm } from '@/forms/user-settings/UserSettings';

export function UserSettingsPage() {
  const { user, error, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-xl">Error loading user data.</p>;
  }

  return (
    <>
      <PageTitle pageName={user?.name || 'User Profile'} />
      <div className="mx-auto my-12 flex max-w-3xl flex-col gap-4">
        <h1 className="font-heading text-emphasis text-4xl tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          Defaults for new sessions and calculations. Already logged sessions
          stay as they are.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <UserSettingsForm currentUser={user} />
      </div>
    </>
  );
}
