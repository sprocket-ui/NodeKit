/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineConfig, mergeConfig } from 'vitest/config';

import type { UserConfig } from 'vite';

export const rootConfig: UserConfig = defineConfig({
  test: {
    globals: true,
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium'
        },
        {
          browser: 'firefox'
        },
        {
          browser: 'webkit'
        }
      ]
    }
  }
});

export default mergeConfig(
  rootConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'istanbul',
        reporter: ['lcov', 'text']
      },
      projects: ['packages/**/vitest.config.*']
    }
  })
);
