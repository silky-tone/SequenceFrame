import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import Package from './package.json';

const PackageName = Package.name.split('-').map(item => {
  return item.trim();
}).filter(item => {
  return Boolean(item);
}).map(item => {
  return item ? item[0].toUpperCase() + item.slice(1) : '';
}).join('');

export default defineConfig({
  root: resolve(__dirname, './example'),
  server: {
    port: 8415,
    open: true,
  },
  publicDir: resolve(__dirname, './public'),
  build: {
    target: 'chrome74',
    outDir: resolve(__dirname, './dist'),
    lib: {
      name: PackageName,
      fileName: Package.name,
      formats: ['umd', 'es'],
      entry: resolve(__dirname, './lib/index.ts'),
    },
  },
});
