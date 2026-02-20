import { Outlet } from 'react-router';
import Container from '@mui/material/Container';

export function AppLayout() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
      <Outlet />
    </Container>
  );
}
