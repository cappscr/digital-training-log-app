import { useTheme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack>
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h1">
        Digital Training Log App
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Coming soon...
      </Typography>
      <Button component={Link} variant="contained" sx={{ mt: 4 }} to="/signup">
        Sign Up
      </Button>
    </Stack>
  );
};
