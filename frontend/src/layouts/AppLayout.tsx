import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import { AppBar } from '../components/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavDrawer } from '../components/NavDrawer';
import CssBaseline from '@mui/material/CssBaseline';

export function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <CssBaseline />{' '}
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
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
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 4, lg: 25 },
            maxWidth: { sm: '100%', md: 840, lg: '100%', xl: 1040 },
            width: '100%',
            mx: 'auto',
            pt: 4,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
