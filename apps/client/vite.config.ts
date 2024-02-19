import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      src: '/src',
      components: '/src/components',
      layouts: '/src/layouts',
      pages: '/src/pages',
      assets: '/src/assets',
      lib: '/src/lib',
      utils: '/src/utils',
      routes: '/src/routes',
    },
  },
});