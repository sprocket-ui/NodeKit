/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key, ElementType } from 'react';

interface UseTabCallbackOptions {
  /** Called when tab is pressed. */
  onPress?: (e: any) => void;

  /** Called when press starts. */
  onPressStart?: (e: any) => void;

  /** Called when press ends. */
  onPressEnd?: (e: any) => void;

  /** Called on press up. */
  onPressUp?: (e: any) => void;

  /** Called when pressed state changes. */
  onPressChange?: (isPressed: boolean) => void;
}

export interface UseTabOptions<T extends ElementType = 'div'> extends UseTabCallbackOptions {
  /** Unique value for this tab. Links tab to its panel. */
  value: Key;

  /** Whether this tab is disabled. */
  isDisabled?: boolean;

  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;

  /** Whether selection occurs on press up. */
  shouldSelectOnPressUp?: boolean;

  /** Whether to prevent focus on press. */
  preventFocusOnPress?: boolean;

  /** Whether to auto focus this tab. */
  autoFocus?: boolean;
}

export type UseTabReturn<T extends ElementType = 'div'> = Readonly<{
  /** Props to spread on the tab element. */
  tabProps: Record<string, any>;

  /** The unique ID for this tab element. */
  tabId: string;

  /** The unique ID for the associated tab panel. */
  tabPanelId: string;

  /** The resolved element type. */
  elementType: T;

  /** Whether this tab is selected. */
  isSelected: boolean;

  /** Whether this tab is disabled. */
  isDisabled: boolean;

  /** Whether this tab is pressed. */
  isPressed: boolean;

  /** Whether this tab is hovered. */
  isHovered: boolean;

  /** Whether this tab is focused. */
  isFocused: boolean;

  /** Whether focus is visible (keyboard focus). */
  isFocusVisible: boolean;
}>;