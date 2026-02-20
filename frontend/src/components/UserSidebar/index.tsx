import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Gravatar } from '../Gravatar';
import { useUser } from '../../hooks/useUser';

export function UserSidebar({ userId }: { userId: string }) {
  const { user } = useUser(userId);
  return (
    <Box component="aside" sx={{ width: 250 }}>
      <Box component="section" sx={{ marginTop: 3, py: 2, px: 0 }}>
        <Typography variant="h4">{user?.name}</Typography>
        <Gravatar userId={userId} />
      </Box>
    </Box>
  );
}
