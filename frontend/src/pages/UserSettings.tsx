import { useCurrentUser } from '../hooks/useCurrentUser';

import { Loading } from '@/components/Loading';
import { PageTitle } from '@/components/PageTitle';
import { UserSettingsForm } from '@/forms/UserSettings';

export function UserSettingsPage() {
  const { user, error, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-xl">Error loading user data.</p>;
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <PageTitle pageName={user?.name || 'User Profile'} />
      <h1 className="font-heading text-emphasis mt-10 px-8 text-4xl tracking-tight">
        Settings
      </h1>
      <p className="text-muted-foreground px-8 text-sm">
        Defaults for new sessions and calculations. Already logged sessions stay
        as they are.
      </p>
      <UserSettingsForm currentUser={user} />
    </div>
  );
}
