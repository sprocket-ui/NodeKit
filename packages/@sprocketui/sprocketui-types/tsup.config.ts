import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  dts: true,
  minify: true,
  esbuildOptions(options) {
    options.legalComments = 'none';
  },
});
