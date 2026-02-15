/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';

/** Props for the SelectionIndicator component. */
export interface SelectionIndicatorProps<T extends ElementType = 'div'>
  extends RenderProps<{ isSelected: boolean }> {
  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;

  /** Slot name for context props. */
  slot?: string | null;
}
