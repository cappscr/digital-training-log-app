import { defineConfig, mergeConfig } from 'vite';
import { defineConfig as defineViteConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
});

const vitestConfig = defineViteConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
