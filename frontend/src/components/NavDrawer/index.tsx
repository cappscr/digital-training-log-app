import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface NavDrawerProps {
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const NavDrawer = ({
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavDrawerProps) => {
  const theme = useTheme();

  return (
    <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileMenuOpen : true}
        onClose={setMobileMenuOpen}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: 'background.default',
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      ></Drawer>
    </Box>
  );
};
