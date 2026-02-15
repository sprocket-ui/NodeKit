/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ButtonOptions } from '@sprocketui-types/button';
import type { ElementType, HTMLAttributes, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

interface UseButtonCallbackProps {
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

export interface UseButtonOptions<T extends ElementType>
  extends Omit<HTMLAttributes<HTMLElement>, keyof ButtonOptions<any> | 'children' | 'className' | 'style' | 'slot'>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLAttributes<any> | keyof ButtonOptions<any>>,
    ButtonOptions<T>,
    UseButtonCallbackProps {
  // Element to render the button as.
  elementType?: T;

  // Prevents focus of element on press events.
  preventFocusOnPress?: boolean;

  // Wether the button is disabled or not
  isDisabled?: boolean;
}

export type UseButtonReturn<T extends ElementType> = Readonly<{
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
