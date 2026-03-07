import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

export const Sitemark = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      spacing={1.5}
      onClick={() => navigate('/')}
      sx={{ cursor: 'pointer' }}
    >
      <img
        src="/menu_book_rounded_offwhite.svg"
        alt="Sitemark Icon"
        width={40}
        height={40}
      />
      <Typography
        variant="h5"
        component="span"
        color="inherit"
        sx={{ letterSpacing: '-0.5px' }}
      >
        Digital Training Log
      </Typography>
    </Stack>
  );
};
