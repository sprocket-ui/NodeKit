/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Enumeration of valid input mode values for Sprocket UI Input components.
 * Input modes provide hints to browsers about what kind of virtual keyboard to display on mobile devices.
 */
export enum InputModeValues {
  Tel = 'tel',
  Url = 'url',
  Text = 'text',
  None = 'none',
  Email = 'email',
  Search = 'search',
  Numeric = 'numeric',
  Decimal = 'decimal'
}

/**
 * String literal type representing valid input modes.
 */
export type InputModes = `${InputModeValues}`;