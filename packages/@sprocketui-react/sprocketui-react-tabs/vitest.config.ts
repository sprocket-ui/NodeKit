/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTransformMode: {
      web: ['\\.jsx?$', '\\.tsx?$']
    }
  },
  resolve: {
    alias: [
      {
        find: /^@sprocketui-react\/button\/(.*)$/,
        replacement: path.resolve(__dirname, 'src/$1')
      },
      {
        find: '@sprocketui-react/button',
        replacement: path.resolve(__dirname, 'src/index.ts')
      }
    ]
  }
});
