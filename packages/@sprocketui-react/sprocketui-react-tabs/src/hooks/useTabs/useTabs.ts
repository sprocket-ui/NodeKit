/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useId } from '@necto-react/hooks';

import { DEFAULT_TAB_TAG } from '../../constants';

import type { ElementType } from 'react';
import type { UseTabsOptions, UseTabsReturn } from './useTabs.types';

/**
 * Hook for the Tabs wrapper component.
 * Handles default values and returns props for the wrapper element
 * and context value to provide to children.
 *
 * @template T The element type to render as.
 * @param options - Configuration options for the tabs.
 * @returns Props for the wrapper, context value, and element type.
 */
export function useTabs<T extends ElementType = typeof DEFAULT_TAB_TAG>(
  options: UseTabsOptions<T>
): UseTabsReturn<T> {
  const {
    id,
    selectedValue,
    disabledValues,
    defaultSelectedValue,
    isDisabled = false,
    orientation = 'horizontal',
    activationMode = 'automatic',
    elementType = options.as ?? DEFAULT_TAB_TAG,

    // Callbacks
    onSelectionChange
  } = options;

  const tabsProps: Record<string, any> = {
    id: useId({ defaultId: id }),
    'data-orientation': orientation
  };

  const contextValue: Partial<UseTabsOptions> = {
    isDisabled,
    selectedValue,
    orientation,
    disabledValues,
    activationMode,
    defaultSelectedValue,
    onSelectionChange
  };

  return {
    tabsProps,
    contextValue,
    elementType: elementType as T
  };
}
