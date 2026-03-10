import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  clean: true,
  minify: true,
  splitting: false,
  external: [
    'esbuild',
    'react',
    'react-dom',
    'react/jsx-runtime',
    /^@necto/,
    /^@necto-react/,
    /^@sprocketui-types/,
    /^@react-aria/,
    /^react-aria/,
  ],
  esbuildOptions(options) {
    options.legalComments = 'none';
  },
});
