/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { UseTabPanelOptions } from '../../hooks/useTabPanel';

/** Props for the TabPanel component. */
export interface TabPanelProps<T extends ElementType = 'div'>
  extends UseTabPanelOptions<T>,
    RenderProps<{ isSelected: boolean }> {
  /** Slot name for context props. */
  slot?: string | null;

  /** Whether to force mount the panel even when not selected. */
  forceMount?: boolean;
}
