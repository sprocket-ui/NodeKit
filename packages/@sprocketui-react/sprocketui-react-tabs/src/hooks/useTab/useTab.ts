/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import {
  useHover,
  usePress,
  useFocusRing,
  useFocusable,
  useAriaProps
} from '@necto-react/hooks';
import { defu } from 'defu';
import { mergeProps } from '@necto/mergers';

import { generateId } from '../../utils';
import { DEFAULT_TAB_TAG } from '../../constants';

import type { TabsState } from '../../types';
import type { UseTabOptions, UseTabReturn } from './useTab.types';
import type { ElementType, RefObject, AriaAttributes } from 'react';

export function useTab<T extends ElementType = typeof DEFAULT_TAB_TAG>(
  options: UseTabOptions<T>,
  state: TabsState,
  ref: RefObject<any>
): UseTabReturn<T> {
  const {
    value,
    autoFocus,
    preventFocusOnPress,
    isDisabled: isDisabledProp,
    elementType,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange
  } = defu(options, {
    isDisabled: false,
    elementType: options.elementType || options.as || DEFAULT_TAB_TAG
  });

  const isDisabled: boolean = isDisabledProp || state.isValueDisabled(value);
  const isSelected: boolean = value === state.selectedValue;

  const tabId: string = generateId(state, value, 'tab');
  const tabPanelId: string = generateId(state, value, 'tabpanel');

  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusableProps } = useFocusable({ isDisabled } as any, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const ariaProps: AriaAttributes = useAriaProps({ isSelected, isDisabled });

  const { pressProps, isPressed } = usePress({
    ref,
    isDisabled,
    preventFocusOnPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onPress(e: any): void {
      if (!isDisabled) {
        state.setSelectedValue(value);
      }
      onPress?.(e);
    }
  });

  const tabProps: Record<string, any> = mergeProps(
    focusableProps,
    pressProps,
    hoverProps,
    focusProps,
    ariaProps,
    {
      id: tabId,
      role: 'tab',
      'data-value': String(value),
      'aria-controls': isSelected ? tabPanelId : undefined,
      tabIndex: isDisabled ? undefined : isSelected ? 0 : -1
    }
  );

  return {
    tabProps,
    tabId,
    tabPanelId,
    elementType: elementType as T,
    isSelected,
    isDisabled,
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible
  };
}
