import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5176,
    origin: 'http://localhost:5176',
  },
  preview: {
    port: 5176,
  },
  base: 'http://localhost:5176',
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      exposes: {
        './App1': './src/App1',
      },
      filename: 'remoteEntry-[hash].js',
      manifest: true,
      shared: {
        'react/': {},
        react: {
          requiredVersion: '18',
        },
        'react-dom/': {},
        'react-dom': {},
      },
    }),
  ],
  build: {
    target: 'chrome89',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
