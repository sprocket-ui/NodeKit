/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { LabelOptions } from '@sprocketui-types/label';
import type { UseLabelProps } from '@sprocketui-react/label';

/**
 * Props for the Label component.
 */
export interface LabelProps
  extends LabelOptions<ElementType>,
    RenderProps<any>,
    UseLabelProps<ElementType> {
  // Slot values for React rendering.
  slot?: string | null;
}