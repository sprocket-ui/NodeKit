/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Enumeration of valid input type values for Sprocket UI Input components.
 * These correspond to HTML input element types that accept text-based input.
 */
export enum InputTypeValues {
  Url = 'url',
  Tel = 'tel',
  Text = 'text',
  Email = 'email',
  Search = 'search',
  Password = 'password'
}

/**
 * String literal type representing valid input types.
 * Allows enum values or any custom string for extensibility.
 */
export type InputTypes = `${InputTypeValues}` | string & {};
