/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { InputOptions } from '@sprocketui-types/input';
import type { ElementType, HTMLAttributes, InputHTMLAttributes } from 'react';

interface UseInputCallbackProps {
  // User value change callback handler (simpler than onChange - provides just the string value).
  onValueChange?: (value: string) => void;

  // User clear callback handler (for clearable inputs).
  onClear?: () => void;
}

export interface UseInputProps<T extends ElementType>
  extends Omit<HTMLAttributes<HTMLElement>, keyof InputOptions<any> | 'children' | 'className' | 'style' | 'slot'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, keyof HTMLAttributes<any> | keyof InputOptions<any>>,
    InputOptions<T>,
    UseInputCallbackProps {
  // Element to render the input as (backwards compatibility with elementType).
  elementType?: T;

  // Whether the input is disabled or not.
  isDisabled?: boolean;

  // Whether the input is read-only or not.
  isReadOnly?: boolean;

  // Whether the input is required or not.
  isRequired?: boolean;

  // Whether to show a clear button.
  clearable?: boolean;
}

export type UseInputReturn<T extends ElementType> = Readonly<{
  // The HTML render tag of the input (defaults to input).
  elementType: T;

  // Props to spread on the input element.
  inputProps: HTMLAttributes<any>;

  // Whether the input is currently hovered.
  isHovered: boolean;

  // Whether the input is currently focused.
  isFocused: boolean;

  // Whether the input is disabled.
  isDisabled: boolean;

  // Whether the input is read-only.
  isReadOnly: boolean;

  // Whether the input is required.
  isRequired: boolean;

  // Whether the focus is visible (keyboard navigation). isFocused will also be true if this is true.
  isFocusVisible: boolean;

  // Whether the input has a validation error.
  isInvalid: boolean;

  // Function to programmatically clear the input (only present if clearable prop is true).
  clearInput?: () => void;
}>;
