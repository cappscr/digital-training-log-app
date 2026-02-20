import Avatar from '@mui/material/Avatar';
import { useUser } from '../../hooks/useUser';

export function Gravatar({
  userId,
  size = 50,
}: {
  userId: string;
  size?: number;
}) {
  const { user } = useUser(userId);
  return (
    <Avatar
      alt={user?.name || 'User Avatar'}
      src={`https://secure.gravatar.com/avatar/${user?.gravatar_id}?s=${size}`}
      sx={{ width: size, height: size, marginRight: 2 }}
    />
  );
}
