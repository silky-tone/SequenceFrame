import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import Package from './package.json';

export default defineConfig({
  plugins: [],
  root: resolve(__dirname, './example'),
  server: {
    port: 8415,
    open: true,
  },
  build: {
    outDir: 'dist',
    lib: {
      name: Package.name,
      formats: ['umd', 'cjs'],
      entry: resolve(__dirname, './lib/index.ts'),
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, './example/index.html'),
      },
    },
  },
});
