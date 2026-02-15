/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { ButtonOptions } from '@sprocketui-types/button';
import type { UseButtonOptions } from '../../hooks/useButton/useButton.types';

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends ButtonOptions<ElementType>,
    RenderProps<any>,
    UseButtonOptions<ElementType> {
  // Slot values for React rendering.
  slot?: string | null;
}
