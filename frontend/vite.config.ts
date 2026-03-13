import { defineConfig, mergeConfig } from 'vite';
import { defineConfig as defineViteConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
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

const vitestConfig = defineViteConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.tsx',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
