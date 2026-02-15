/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key, ElementType } from 'react';
import type { TabsOrientation, TabsActivationMode } from '../../types';

/** Options for useTabs hook. */
export interface UseTabsOptions<T extends ElementType = 'div'> {
  /** Initially selected tab value (uncontrolled). */
  defaultSelectedValue?: Key;

  /** Selected tab value (controlled). */
  selectedValue?: Key;

  /** Called when selection changes. */
  onSelectionChange?: (value: Key) => void;

  /** The orientation of the tabs. @default 'horizontal' */
  orientation?: TabsOrientation;

  /** The activation mode for tabs. @default 'automatic' */
  activationMode?: TabsActivationMode;

  /** Whether all tabs are disabled. */
  isDisabled?: boolean;

  /** Values of disabled tabs. */
  disabledValues?: Iterable<Key>;

  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;

  /** The id for the tabs element. */
  id?: string;
}

/** Return value from useTabs hook. */
export interface UseTabsReturn<T extends ElementType = 'div'> {
  /** Props to spread on the tabs wrapper element. */
  tabsProps: Record<string, any>;

  /** Context value to provide to TabList and TabPanel children. */
  contextValue: Partial<UseTabsOptions>;

  /** The resolved element type. */
  elementType: T;
}
