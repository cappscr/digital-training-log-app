import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Sitemark } from '../Sitemark';
import { useTheme } from '@mui/material';

interface AppBarProps {
  isMobile: boolean;
  handleDrawerToggle: () => void;
}

export const AppBar = ({ isMobile, handleDrawerToggle }: AppBarProps) => {
  const theme = useTheme();

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Sitemark />
      </Toolbar>
    </MuiAppBar>
  );
};
