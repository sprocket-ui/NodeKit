/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'node:path';
import react from '@vitejs/plugin-react';
import { mergeConfig, defineConfig } from 'vitest/config';

import { rootConfig } from '../../../vitest.config';

export default mergeConfig(
  rootConfig,
  defineConfig({
    plugins: [react()],
    test: {
      testTransformMode: {
        web: ['\\.jsx?$', '\\.tsx?$']
      },
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.d.ts']
      }
    },
    optimizeDeps: {
      include: ['@necto-react/hooks']
    },
    resolve: {
      alias: [
        {
          find: /^@sprocketui-react\/popover\/(.*)$/,
          replacement: path.resolve(__dirname, 'src/$1')
        },
        {
          find: '@sprocketui-react/popover',
          replacement: path.resolve(__dirname, 'src/index.ts')
        }
      ]
    }
  })
);
