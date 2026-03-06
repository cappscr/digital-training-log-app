import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { AppBar } from '../components/AppBar';

export function AppLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar />
      <Outlet />
    </Box>
  );
}
