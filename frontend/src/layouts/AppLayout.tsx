import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { AppBar } from '../components/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavDrawer } from '../components/NavDrawer';

export function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />
      <NavDrawer
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, width: '100%' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
