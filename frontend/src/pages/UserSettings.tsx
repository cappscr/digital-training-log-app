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
      <PageTitle pageName="User Settings" />
      <section className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="my-8 flex w-full max-w-xl flex-col gap-4 px-4 md:px-0">
          <h1 className="font-heading text-emphasis text-4xl tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Defaults for new sessions and calculations. Already logged sessions
            stay as they are.
          </p>
        </div>
        <div className="w-full max-w-xl px-4 md:px-0">
          <UserSettingsForm currentUser={user} />
        </div>
      </section>
    </>
  );
}
