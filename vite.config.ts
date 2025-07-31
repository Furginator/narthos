import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import vitest from 'vitest/config'; // Import Vitest config

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: true,
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
});