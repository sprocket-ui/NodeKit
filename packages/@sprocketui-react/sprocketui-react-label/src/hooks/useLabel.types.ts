/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { LabelOptions } from '@sprocketui-types/label';
import type { ElementType, MouseEvent, HTMLAttributes, LabelHTMLAttributes } from 'react';

interface UseLabelCallbackProps {
  /** Callback fired on mouse down. */
  onMouseDown?: (event: MouseEvent<HTMLLabelElement>) => void;
}

/**
 * Props for the useLabel hook.
 */
export interface UseLabelProps<T extends ElementType = 'label'>
  extends Omit<HTMLAttributes<HTMLElement>, keyof LabelOptions<any> | 'children' | 'className' | 'style' | 'slot' | 'onMouseDown'>,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof HTMLAttributes<any> | keyof LabelOptions<any>>,
    LabelOptions<T>,
    UseLabelCallbackProps {
  /** The element type to render as (e.g., 'label', 'span'). */
  elementType?: T;
}

/**
 * Return type for the useLabel hook.
 */
export interface UseLabelReturn<T extends ElementType = 'label'> {
  /** Props to spread onto the label element. */
  labelProps: Record<string, any>;

  /** Props to spread onto the associated field element. */
  fieldProps: Record<string, any>;

  /** The element type to render. */
  elementType: T;
}