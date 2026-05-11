/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig } from 'tsdown';

export default defineConfig({
  workspace: [
    'packages/@sprocketui/*',
    'packages/@sprocketui-react/*',
    'packages/@sprocketui-types/*'
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  external: [
    'esbuild',
    'react',
    'react-dom',
    'react/jsx-runtime',
    /^@necto/,
    /^@necto-react/,
    /^@sprocketui-types/,
  ]
});
