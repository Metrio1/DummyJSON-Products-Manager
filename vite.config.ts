import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const stylesDir = path.resolve(__dirname, 'src/styles');

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/DummyJSON-Products-Manager/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@shared': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': stylesDir,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/abstracts" as *;\n`,
      },
    },
  },
}));
