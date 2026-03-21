import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

const vitestConfig = defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.tsx', 'tests/**/*.test.ts'],
    setupFiles: './tests/vitest.setup.tsx',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
