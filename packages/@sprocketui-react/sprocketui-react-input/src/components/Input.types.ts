/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { InputOptions } from '@sprocketui-types/input';
import type { UseInputProps } from '@sprocketui-react/input';

/**
 * Props for the Button component.
 */
export interface InputProps
  extends InputOptions<ElementType>,
    RenderProps<any>,
    UseInputProps<ElementType> {
  // Slot values for React rendering.
  slot?: string | null;
}
