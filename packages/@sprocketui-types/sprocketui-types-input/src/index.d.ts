/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { InputModeValues } from './mode.d';
import { InputTypeValues } from './types.d';

import type { InputModes } from './mode.d';
import type { InputTypes } from './types.d';

/**
 * Options for configuring a Sprocket UI Input component.
 *
 * @template T The element type to render as (e.g., 'input', 'textarea').
 */
interface InputOptions<T> {
  /** Alternative input renderer. */
  as?: T;

  /** Whether the input is required. */
  required?: boolean;

  /** Whether the input is read-only. */
  readonly?: boolean;

  /** Enable or disable autofocus. */
  autoFocus?: boolean;

  /** Autocomplete hint for the input. */
  autoComplete?: string;

  /** Maximum length of the input value. */
  maxLength?: number;

  /** Minimum length of the input value. */
  minLength?: number;

  /** Pattern for input validation (string for HTML pattern attribute). */
  pattern?: string;

  /** Whether the input is disabled (HTML/Vue-style). */
  disabled?: boolean;

  /** The id attribute for the input element. */
  id?: string;

  /** Placeholder text for the input element. */
  placeholder?: string;

  /** The type of input element to use. */
  type?: InputTypes;

  /** Input mode hint for mobile keyboards. */
  inputMode?: InputModes;

  /** Autocorrect behavior for the input. */
  autoCorrect?: string;

  /** Spell check behavior for the input (boolean or "true"/"false" string). */
  spellCheck?: boolean | 'true' | 'false';

  /** Validation behavior (native browser or Sprocket custom). */
  validationBehavior?: 'native' | 'sprocket';

  /** Name attribute for form submission. */
  name?: string;

  /** Form id to associate this input with. */
  form?: string;

  /** The current value (controlled). */
  value?: string | number | readonly string[];

  /** The default value (uncontrolled). */
  defaultValue?: string | number | readonly string[];
}

export { InputTypeValues, InputModeValues };

export type { InputOptions, InputModes, InputTypes };