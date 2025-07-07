/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import type { DEFAULT_BUTTON_TAG } from './useButton';
import type { ElementType, HTMLAttributes } from 'react';
import type { ButtonOptions } from '@sprocketui-types/button';

export interface UseButtonProps<T extends ElementType = typeof DEFAULT_BUTTON_TAG> extends ButtonOptions<T> {
  // Element to render the button as.
  elementType?: string;

  // Prevents focus of element on press events.
  preventFocusOnPress?: boolean;

  // Location to route the button to.
  href?: string;

  // The target that will be used for the href routing.
  target?: string;

  // Relationship HTML linker option.
  rel?: string;

  // Wether the button is disabled or not
  isDisabled: boolean;

  // User click callback handler.
  onClick?: (e: any) => void;

  // User press callback handler.
  onPress?: (e: any) => void;

  // User press start callback handler.
  onPressStart?: (e: any) => void;

  // User press end callback handler.
  onPressEnd?: (e: any) => void;

  // User press up callback handler.
  onPressUp?: (e: any) => void;

  // User press change callback handler.
  onPressChange?: (isPressed: boolean) => void;
}

export type ButtonHookReturn<T extends ElementType = typeof DEFAULT_BUTTON_TAG> = Readonly<{
  // The HTML render tag of the button (defaults to button).
  elementType: T;

  // Returns other button related props.
  buttonProps: HTMLAttributes<any>;

  // Wether the button is pressed.
  isPressed: boolean;

  // Wether the button is hovered.
  isHovered: boolean;

  // Wether the button is focused.
  isFocused: boolean;

  // Wether the button is disabled.
  isDisabled: boolean;

  // Wether the focus on the button is visible (isFocused will also be true if this is true).
  isFocusVisible: boolean;
}>;