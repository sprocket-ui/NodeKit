/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { UseTabsOptions } from '../../hooks/useTabs';

/** Props for the Tabs component. */
export interface TabsProps<T extends ElementType = 'div'>
  extends UseTabsOptions<T>,
    RenderProps<{ orientation: string }> {
  /** Slot name for context props. */
  slot?: string | null;
}
