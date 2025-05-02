/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export enum ButtonTypeValues {
  Reset = 'reset',
  Button = 'button',
  Submit = 'submit'
}
export type ButtonTypes = `${ButtonTypeValues}`;

export interface ButtonOptions<T> {
  // Alternative button renderer.
  as?: T;

  // Wether or not to allow focus on disabled element.
  focusDisabled?: boolean;

  // Enable or disable autofocus.
  autoFocus?: boolean;

  // Whether the button is disabled (HTML/Vue-style).
  disabled?: boolean;

  // The type of button element to use.
  type?: ButtonTypes;
}