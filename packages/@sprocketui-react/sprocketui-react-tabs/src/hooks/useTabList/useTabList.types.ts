/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key, ElementType } from 'react';
import type { TabsState, TabsOrientation, TabsActivationMode } from '../../types';

/** Options for useTabList hook. */
export interface UseTabListOptions<T extends ElementType = 'div'> {
  /** Initially selected tab value (uncontrolled). */
  defaultSelectedValue?: Key;

  /** Selected tab value (controlled). */
  selectedValue?: Key;

  /** Called when selection changes. */
  onSelectionChange?: (value: Key) => void;

  /** @default 'horizontal' */
  orientation?: TabsOrientation;

  /** @default 'automatic' */
  activationMode?: TabsActivationMode;

  /** Whether all tabs are disabled. */
  isDisabled?: boolean;

  /** Values of disabled tabs. */
  disabledValues?: Iterable<Key>;

  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;

  /** Label for the tablist. */
  'aria-label'?: string;

  /** ID of element that labels the tablist. */
  'aria-labelledby'?: string;

  /** ID of element that describes the tablist. */
  'aria-describedby'?: string;
}

/** Return value from useTabList hook. */
export interface UseTabListReturn<T extends ElementType = 'div'> {
  /** Props to spread on the tablist element. */
  tabListProps: Record<string, any>;

  /** The resolved element type. */
  elementType: T;

  /** State to provide via context to Tab components. */
  state: TabsState;
}
