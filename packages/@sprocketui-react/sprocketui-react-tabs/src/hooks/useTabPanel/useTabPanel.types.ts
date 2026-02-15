/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key, ElementType } from 'react';

/** Options for useTabPanel hook. */
export interface UseTabPanelOptions<T extends ElementType = 'div'> {
  /** The value that associates this panel with a tab. */
  value: Key;

  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;
}

/** Return value from useTabPanel hook. */
export interface UseTabPanelReturn<T extends ElementType = 'div'> {
  /** Props to spread on the tabpanel element. */
  tabPanelProps: Record<string, any>;

  /** The resolved element type. */
  elementType: T;

  /** Whether this panel is selected (visible). */
  isSelected: boolean;
}
