import { legalCommentPlugin } from '../esbuild/plugins/legal-comment-plugin';

import type { Options } from 'tsup';

export const reactConfig: Options = {
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
    'react',
    'react-dom',
    'react/jsx-runtime',
    /^@necto\//,
    /^@necto-react\//,
    /^@sprocketui-types\//,
  ],
  esbuildPlugins: [legalCommentPlugin()],
};
