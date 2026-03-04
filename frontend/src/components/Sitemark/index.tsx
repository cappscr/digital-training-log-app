import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Sitemark = () => {
  return (
    <Stack direction="row" spacing={1.5}>
      <img
        src="/menu_book_rounded.svg"
        alt="Sitemark Icon"
        width={32}
        height={32}
      />
      <Typography
        variant="h5"
        component="span"
        sx={{ letterSpacing: '-0.5px' }}
      >
        Digital Training Log
      </Typography>
    </Stack>
  );
};
