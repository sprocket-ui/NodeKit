/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { UseToggleButtonOptions } from '../../hooks/useToggleButton/useToggleButton.types';

/**
 * Props for the ToggleButton component.
 */
export interface ToggleButtonProps
  extends RenderProps<any>,
    UseToggleButtonOptions<ElementType> {
  // Slot values for React rendering.
  slot?: string | null;
}
