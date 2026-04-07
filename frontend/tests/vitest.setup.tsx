import '@testing-library/jest-dom/vitest';
import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@/components/ThemeProvider';
import { vi } from 'vitest';
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';

// Mock matchMedia — jsdom doesn't implement it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// eslint-disable-next-line react-refresh/only-export-components
function Wrapper({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </BrowserRouter>
  );
}

export function render(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
