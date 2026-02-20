import { useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router';
import { useUser } from '../../hooks/useUser';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { PageTitle } from '../../components/PageTitle';
import { UserSidebar } from '../../components/UserSidebar';

export function UserProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [displayWelcomeMessage, setDisplayWelcomeMessage] = useState(
    searchParams.get('message') === 'welcome',
  );
  const { id } = useParams<{ id: string }>();
  const { user, error, isLoading } = useUser(id!);

  return isLoading ? (
    <Typography variant="h4">Loading...</Typography>
  ) : error ? (
    <Typography variant="h4">Error loading user data.</Typography>
  ) : (
    <>
      <PageTitle pageName={user?.name || 'User Profile'} />
      {displayWelcomeMessage && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => {
            setDisplayWelcomeMessage(false);
            searchParams.delete('message');
            navigate(`/users/${id}`);
          }}
        >
          Welcome to the Sample App!
        </Alert>
      )}
      <UserSidebar userId={id!} />
      <Typography variant="h4">User Profile Page</Typography>
    </>
  );
}
