/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CSSProperties, RefObject } from 'react';
import type { TabsState } from '../../types';

export interface SelectionIndicatorMetrics {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseSelectionIndicatorOptions {
  state: TabsState;
  tabListRef: RefObject<HTMLElement | null>;
}

export interface UseSelectionIndicatorReturn {
  isSelected: boolean;
  metrics: SelectionIndicatorMetrics | null;
  indicatorStyle: CSSProperties;
  selectionIndicatorProps: Record<string, any>;
}
