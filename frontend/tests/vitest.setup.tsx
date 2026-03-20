import '@testing-library/jest-dom/vitest';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { blueGrayTheme } from '../src/theme';
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';

// eslint-disable-next-line react-refresh/only-export-components
function Wrapper({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={blueGrayTheme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

export function render(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
