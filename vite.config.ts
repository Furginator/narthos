// vite.config.ts
// This is a Vite configuration file for a React project with TypeScript support.
// It includes plugins for React, sets up testing with jsdom, and configures path aliases
// for easier imports.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

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