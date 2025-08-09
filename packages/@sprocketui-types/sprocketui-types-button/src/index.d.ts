/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * The possible values for the HTML button type attribute.
 */
export enum ButtonTypeValues {
  Reset = 'reset',
  Button = 'button',
  Submit = 'submit'
}

/**
 * String literal type for allowed button types.
 */
export type ButtonTypes = `${ButtonTypeValues}`;

/**
 * Options for configuring a Sprocket UI Button component.
 *
 * @template T The element type to render as (e.g., 'button', 'a', 'input').
 */
export interface ButtonOptions<T> {
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
