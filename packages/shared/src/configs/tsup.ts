// biome-ignore-all assist/source/organizeImports: No need to sort imports.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defineConfig } from 'tsup';

import type { Options } from 'tsup';

const base = (overrides: Partial<Options> = {}) =>
  defineConfig({
    entry: ['src/index.ts'],
    outDir: 'dist/vue',
    dts: true,
    clean: true,
    minify: true,
    splitting: false,
    esbuildOptions(options, context) {
      options.legalComments = 'none';
    },
    ...overrides
  });

export const tsup = {
  react: base({
    external: ['esbuild'],
    esbuildPlugins: [],
    format: ['esm', 'cjs', 'iife'],
  }),
  vue: base({
    esbuildPlugins: [],
    format: ['esm', 'cjs']
  })
};