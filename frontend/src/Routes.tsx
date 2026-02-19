import { Routes, Route } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import Typography from '@mui/material/Typography';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          path="/"
          element={
            <Typography variant="h2" component="h1">
              Digital Training Log App
            </Typography>
          }
        />
      </Route>
    </Routes>
  );
}
