import CSSBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './theme';
import { AppRoutes } from './Routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSBaseline />
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
