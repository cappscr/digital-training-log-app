import { Gravatar } from '@/components/Gravatar';
import { useUser } from '@/hooks/useUser';

export function UserSidebar({ userId }: { userId: string }) {
  const { user } = useUser(userId);
  return (
    <aside className="w-3xs">
      <section className="mt-6 p-4">
        <h2 className="my-4 text-xl">{user?.name}</h2>
        <Gravatar userId={userId} size="lg" />
      </section>
    </aside>
  );
}
