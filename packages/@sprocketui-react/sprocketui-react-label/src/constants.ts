/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HTMLElements } from '@necto/dom';

export const LABEL_NAME: string = 'Label' as const;
export const DEFAULT_LABEL_TAG: keyof HTMLElementTagNameMap = HTMLElements.Label;

/**
 * Label-specific forwarded props. Labels don't submit forms or carry values,
 * so the allowlist is minimal — just `id` for linking.
 */
export const ALLOWED_EXTERNAL_PROPS = ['id'] as const;
