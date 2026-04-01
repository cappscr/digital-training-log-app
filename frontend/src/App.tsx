import { ThemeProvider } from '@/components/ThemeProvider';
import { SWRConfig } from 'swr';
import { fetcher } from './fetcher';
import { AppRoutes } from './Routes';
import './app.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css'; // Great for "Athlete Notes"
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
import '@fontsource/lora/700.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dtl-ui-theme">
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <AppRoutes />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
