import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5175,
  },
  preview: {
    port: 5175,
  },
  plugins: [
    react(),
    federation({
      name: 'viteViteHost',
      filename: 'remoteEntry-[hash].js',
      manifest: true,
      shared: {
        'react/': {
          requiredVersion: '18',
        },
        'react-dom': {},
      },
    }),
  ],
  build: {
    target: 'chrome89',
  },
});
