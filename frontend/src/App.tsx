import { ThemeProvider } from '@/components/ThemeProvider';
import { SWRConfig } from 'swr';
import { fetcher } from './fetcher';
import { RouterProvider } from 'react-router/dom';
import { router } from './Routes.tsx';
import './app.css';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dtl-ui-theme">
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </ThemeProvider>
  );
}

export default App;
