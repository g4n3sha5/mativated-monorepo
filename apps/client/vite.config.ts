import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  plugins: [react(), svgr()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
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
