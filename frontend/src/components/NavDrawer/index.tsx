import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import CalculateRounded from '@mui/icons-material/CalculateRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  const theme = useTheme();
  const menuItems = [
    {
      text: 'Home',
      icon: <HomeRounded />,
      path: '/',
    },
    {
      text: 'Calculators',
      icon: <CalculateRounded />,
      path: '/pace-calculator',
    },
  ];

  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileMenuOpen(false);
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText sx={{ ml: 1 }}>{item.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
