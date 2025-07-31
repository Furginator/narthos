import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/src': '/home/rob/khora/narthos/src', // Optional, if custom paths
    },
  },
});