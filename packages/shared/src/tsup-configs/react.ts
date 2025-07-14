/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import process from 'node:process';
import { defineConfig } from 'tsup';

// @ts-ignore
import esbuildPluginLicense from 'esbuild-plugin-license';

export const reactTsupConfig = defineConfig({
  entry: ['./src/index.ts'],
  external: ['esbuild'],
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  esbuildPlugins: [
    esbuildPluginLicense({
      banner: '// Test Banner',
    })
  ],
  esbuildOptions(options, context) {
    options.legalComments = 'none';
  },
  async onSuccess(): Promise<void> {
    process.stdout.write('Successfully build using Sprocket\'s React preset! \n');
  }
});