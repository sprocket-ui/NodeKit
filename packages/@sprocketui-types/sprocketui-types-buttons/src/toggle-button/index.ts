/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Options for configuring a Sprocket UI ToggleButton component.
 *
 * @template T The element type to render as (e.g., 'button', 'a', 'input').
 */
interface ToggleButtonOptions<T> {
  /** Alternative button renderer. */
  as?: T;

  /** Whether the toggle button is currently selected. */
  selected?: boolean;

  /** Whether the toggle button is selected by default (uncontrolled). */
  defaultSelected?: boolean;
}

export type { ToggleButtonOptions };
