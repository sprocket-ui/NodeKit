import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false
});