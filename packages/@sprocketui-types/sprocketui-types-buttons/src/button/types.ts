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
