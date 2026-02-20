/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';
import type { UseProgressBarOptions } from '../../hooks/useProgressBar';

/** Props for the ProgressBar component. */
export interface ProgressBarProps<T extends ElementType = 'div'>
  extends RenderProps<{
    percentage: number;
    isIndeterminate: boolean;
    isHung: boolean;
  }>,
    UseProgressBarOptions {
  /** The element type to render as. @default 'div' */
  elementType?: T;

  /** Shorthand for elementType. */
  as?: T;

  /** Slot name for context props. */
  slot?: string | null;
}
