/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HTMLElements } from '@necto/dom';

export const BUTTON_NAME = 'Button' as const;
export const TOGGLE_BUTTON_NAME = 'ToggleButton' as const;

export const DEFAULT_BUTTON_TAG: keyof HTMLElementTagNameMap = HTMLElements.Button;

/**
 * Button-specific props that should forward through to the rendered element.
 * Scoped to attributes a `<button>` (or button-as-submit) semantically supports.
 */
export const ALLOWED_EXTERNAL_PROPS = [
  'id',
  'form',
  'name',
  'value',
  'formAction',
  'formEncType',
  'formMethod',
  'formTarget',
  'formNoValidate'
] as const;
