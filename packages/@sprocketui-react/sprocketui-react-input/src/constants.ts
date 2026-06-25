/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HTMLElements } from '@necto/dom';

export const INPUT_NAME: string = 'Input' as const;
export const DEFAULT_INPUT_TAG: keyof HTMLElementTagNameMap = HTMLElements.Input;

/**
 * Input-specific props that should forward through to the rendered element.
 * Scoped to input value/identity attributes.
 */
export const ALLOWED_EXTERNAL_PROPS = [
  'id',
  'form',
  'name',
  'value',
  'defaultValue'
] as const;

/**
 * Input-specific props that propagate from the input to a surrounding label
 * (e.g., the input's pattern, autoComplete, etc. are relevant to the labeled field).
 */
export const ALLOWED_INPUT_LABELABLE_PROPS = [
  'placeholder',
  'type',
  'pattern',
  'inputMode',
  'autoComplete',
  'maxLength',
  'minLength',
  'autoCorrect',
  'spellCheck'
] as const;