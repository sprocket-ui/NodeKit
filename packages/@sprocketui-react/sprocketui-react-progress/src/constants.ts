/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const DEFAULT_PROGRESS_BAR_TAG = 'div' as const;

export const PROGRESS_BAR_NAME = 'ProgressBar' as const;

export const DEFAULT_HUNG_TIMEOUT: number = 5000 as const;

/**
 * Progress-bar-specific forwarded props. Progress bars are purely output
 * (ARIA-driven), so no form attrs and no native `value` — just `id`.
 */
export const ALLOWED_EXTERNAL_PROPS = ['id'] as const;
