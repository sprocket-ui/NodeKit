/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ButtonTypeValues } from './types.d';

import type { ButtonTypes } from './type.d';

/**
 * Options for configuring a Sprocket UI Button component.
 *
 * @template T The element type to render as (e.g., 'button', 'a', 'input').
 */
interface ButtonOptions<T> {
  /** Alternative button renderer. */
  as?: T;

  /** Whether or not to allow focus on a disabled element. */
  focusDisabled?: boolean;

  /** Enable or disable autofocus. */
  autoFocus?: boolean;

  /** Whether the button is disabled (HTML/Vue-style). */
  disabled?: boolean;

  /** The type of button element to use. */
  type?: ButtonTypes;

  /** The id attribute for the button element. */
  id?: string;
}

export { ButtonTypeValues };

export type { ButtonOptions, ButtonTypes };