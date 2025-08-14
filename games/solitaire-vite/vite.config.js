import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, '../../docs/games/solitaire'),
    emptyOutDir: true,
  },
});
