/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { ToggleButtonOptions } from '@sprocketui-types/buttons';
import type { UseButtonOptions, UseButtonReturn } from '../useButton/useButton.types';

export interface UseToggleButtonOptions<T extends ElementType>
  extends Omit<UseButtonOptions<T>, 'onChange'>,
    Omit<ToggleButtonOptions<T>, 'selected'> {
  // Whether the toggle button is currently selected (controlled).
  isSelected?: boolean;

  // Handler called when the toggle button's selection state changes.
  onChange?: (isSelected: boolean) => void;
}

export type UseToggleButtonReturn<T extends ElementType> = UseButtonReturn<T> &
  Readonly<{
    // Whether the toggle button is currently selected.
    isSelected: boolean;
  }>;
