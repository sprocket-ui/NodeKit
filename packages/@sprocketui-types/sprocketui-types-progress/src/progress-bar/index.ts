/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export interface ProgressBarOptions {
  /**
   * The current progress value.
   * Should be between minValue and maxValue.
   * @default 0
   */
  value?: number;

  /**
   * The minimum value of the progress bar.
   * @default 0
   */
  minValue?: number;

  /**
   * The maximum value of the progress bar.
   * @default 100
   */
  maxValue?: number;

  /**
   * Whether the progress bar is in an indeterminate state.
   * When true, shows a loading animation instead of a specific progress value.
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * Intl.NumberFormat options for formatting the progress value display.
   * Commonly used to show progress as a percentage or with specific decimal places.
   * @example
   * ```ts
   * { style: 'percent', minimumFractionDigits: 0 }
   * ```
   */
  formatOptions?: Intl.NumberFormat;

  /**
   * A custom label for the progress value.
   * If not provided, the value will be automatically formatted using formatOptions.
   * Useful for providing custom descriptions like "3 of 10 files uploaded".
   *
   * @example
   * ```ts
   * valueLabel: "3 of 10 files"
   * valueLabel: "Loading..."
   * ```
   */
  label?: string;
}
