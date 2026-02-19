/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key } from 'react';
import type { TabsOrientation, TabsActivationMode } from '@sprocketui-types/tabs';

// Re-export framework-agnostic types
export { TabsOrientationValues, TabsActivationModeValues } from '@sprocketui-types/tabs';
export type { TabsOptions, TabsOrientation, TabsActivationMode } from '@sprocketui-types/tabs';

/** State for tabs, shared via context. */
export interface TabsState {
  /** Unique ID for this tabs instance. */
  readonly id: string;

  /** The currently selected value. */
  readonly selectedValue: Key | null;

  /** Set the selected value. */
  setSelectedValue(value: Key): void;

  /** The currently focused tab key (for roving tabindex). */
  readonly focusedKey: Key | null;

  /** Set the focused key. */
  setFocusedKey(key: Key | null): void;

  /** Orientation of the tabs. */
  readonly orientation: TabsOrientation;

  /** Activation mode. */
  readonly activationMode: TabsActivationMode;

  /** Whether all tabs are disabled. */
  readonly isDisabled: boolean;

  /** Check if a specific value is disabled. */
  isValueDisabled(value: Key): boolean;
}
