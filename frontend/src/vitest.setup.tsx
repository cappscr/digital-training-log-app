import '@testing-library/jest-dom/vitest';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { theme } from './theme';
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';

HelmetProvider.canUseDOM = false;

// eslint-disable-next-line react-refresh/only-export-components
function Wrapper({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <HelmetProvider>{children}</HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export function render(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
