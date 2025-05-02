import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs', 'iife'],
  minify: true,
  dts: true,
  clean: true,
});