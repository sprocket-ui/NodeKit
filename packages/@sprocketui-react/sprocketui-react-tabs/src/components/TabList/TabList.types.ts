/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { UseTabListOptions } from '../../hooks/useTabList';

/** Props for the TabList component. */
export interface TabListProps<T extends ElementType = 'div'>
  extends UseTabListOptions<T>,
    RenderProps<any> {
  /** Slot name for context props. */
  slot?: string | null;
}
