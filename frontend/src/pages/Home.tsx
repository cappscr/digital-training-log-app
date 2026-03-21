import { useTheme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack spacing={4} alignItems="flex-start">
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h1">
        Digital Training Log App
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Coming soon...
      </Typography>
      <Button component={Link} variant="contained" to="/signup">
        Sign Up
      </Button>
      <Button component={Link} variant="outlined" to="/signup">
        Sign Up
      </Button>
      <Button
        component={Link}
        variant="contained"
        color="secondary"
        to="/signup"
      >
        Sign Up
      </Button>
      <Button
        component={Link}
        variant="outlined"
        color="secondary"
        to="/signup"
      >
        Sign Up
      </Button>
    </Stack>
  );
};
