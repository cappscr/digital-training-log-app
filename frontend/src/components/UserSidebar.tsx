import { Gravatar } from '@/components/Gravatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function UserSidebar() {
  const { user } = useCurrentUser();
  return (
    <aside className="w-3xs">
      <section className="mt-6 p-4">
        <h2 className="my-4 text-xl">{user?.name}</h2>
        <Gravatar size="lg" />
      </section>
    </aside>
  );
}
