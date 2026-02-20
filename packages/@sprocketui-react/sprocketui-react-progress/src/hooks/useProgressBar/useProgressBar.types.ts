/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { HTMLAttributes } from 'react';
import type { ProgressBarOptions } from '@sprocketui-types/progress';

export interface UseProgressBarOptions
  extends Omit<HTMLAttributes<HTMLElement>, keyof ProgressBarOptions | 'children' | 'className' | 'style' | 'slot'>,
    ProgressBarOptions {
  /** Time in ms before the progress bar is considered hung. @default 5000 */
  hungTimeout?: number;
}

export type UseProgressBarReturn = Readonly<{
  labelProps?: HTMLAttributes<any>;

  progressBarProps: HTMLAttributes<any>;

  percentage: number;

  isIndeterminate: boolean;

  isHung: boolean;
}>;