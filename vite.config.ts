import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      layouts: '/src/layouts',
      pages: '/src/pages',
      assets: '/src/assets',
      lib: '/src/lib',
    },
  },
});
