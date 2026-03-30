/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { generateId } from '../../utils';
import { DEFAULT_TAB_TAG } from '../../constants';

import type { ElementType } from 'react';
import type { TabsState } from '../../types';
import type { UseTabPanelOptions, UseTabPanelReturn } from './useTabPanel.types';

export function useTabPanel<T extends ElementType = typeof DEFAULT_TAB_TAG>(
  options: UseTabPanelOptions<T>,
  state: TabsState
): UseTabPanelReturn<T> {
  const { value, elementType = options.as ?? DEFAULT_TAB_TAG } = options;

  const isSelected: boolean = state.selectedValue === value;
  const tabId: string = generateId(state, value, 'tab');
  const tabPanelId: string = generateId(state, value, 'tabpanel');

  const tabPanelProps: Record<string, any> = {
    id: tabPanelId,
    role: 'tabpanel',
    'aria-labelledby': tabId,
    tabIndex: 0,
    hidden: !isSelected,
    'data-selected': isSelected ? 'true' : undefined,
    'data-sprocket-state': isSelected ? 'selected' : undefined
  };

  return {
    isSelected,
    tabPanelProps,
    elementType: elementType as T
  };
}
