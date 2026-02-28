import { Outlet } from 'react-router';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

export function FormLayout() {
  return (
    <Container maxWidth="lg">
      <Stack
        justifyContent="center"
        sx={{
          height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
          minHeight: '100%',
        }}
      >
        <Card
          variant="outlined"
          sx={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            maxWidth: { sm: 450 },
            padding: 4,
          }}
        >
          <Outlet />
        </Card>
      </Stack>
    </Container>
  );
}
