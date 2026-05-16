import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function Gravatar({
  size = 'default',
}: {
  size?: 'sm' | 'lg' | 'default';
}) {
  const imageSizes = {
    sm: 22,
    default: 30,
    lg: 38,
  };
  const { user } = useCurrentUser();
  const userInitials =
    user?.name
      .split(' ')
      .map((name) => name[0])
      .join('') ?? 'UA';

  return (
    <Avatar size={size}>
      <AvatarImage
        src={`https://secure.gravatar.com/avatar/${user?.gravatar_id}?s=${imageSizes[size]}`}
        alt={user?.name || 'User Avatar'}
        className="mr-4"
      />
      <AvatarFallback>{userInitials}</AvatarFallback>
    </Avatar>
  );
}
