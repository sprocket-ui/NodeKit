import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

const base = (overrides: Partial<Options> = {}) =>
  defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist',
    dts: true,
    clean: true,
    minify: true,
    splitting: false,
    esbuildOptions(options) {
      options.legalComments = 'none';
    },
    ...overrides
  });

export default defineConfig((options) => {
  const cwd = process.cwd();

  // @sprocketui/sprocketui-types uses index.ts not src/index.ts
  if (cwd.endsWith('sprocketui-types') && !cwd.includes('@sprocketui-types')) {
    return { entry: ['index.ts'], dts: true };
  }

  // React packages
  if (cwd.includes('@sprocketui-react') || cwd.endsWith('sprocketui-react')) {
    return base({
      external: [
        'esbuild',
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@necto/,
        /^@necto-react/,
        /^@sprocketui-types/,
        /^@react-aria/,
        /^react-aria/
      ],
      format: ['esm', 'cjs', 'iife']
    });
  }

  // Shared package (has multiple entry points)
  if (cwd.endsWith('/shared')) {
    return {
      entry: ['src/index.ts'],
      outDir: 'dist',
      format: ['esm', 'cjs', 'iife'],
      dts: true,
      clean: true,
      sourcemap: false,
      splitting: false
    };
  }

  // Default / Vue (future)
  return base({ format: ['esm', 'cjs'] });
});
