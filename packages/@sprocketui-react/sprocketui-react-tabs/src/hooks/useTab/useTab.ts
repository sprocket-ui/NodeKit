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
import { useCallback } from 'react';

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
    elementType,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
    preventFocusOnPress,
    isDisabled: isDisabledProp,
  } = defu(options, {
    isDisabled: false,
    elementType: options.elementType || options.as || DEFAULT_TAB_TAG
  });

  const isSelected: boolean = value === state.selectedValue;
  const isDisabled: boolean = isDisabledProp || state.isValueDisabled(value);

  const tabId: string = generateId(state, value, 'tab');
  const tabPanelId: string = generateId(state, value, 'tabpanel');

  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusableProps } = useFocusable({ isDisabled } as any, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const ariaProps: AriaAttributes = useAriaProps({ isSelected, isDisabled });

  const onTabFocus = useCallback((): void => {
    if (!isDisabled) state.setFocusedKey(value);
  }, [state, value, isDisabled]);

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

  const sprocketState: string[] = [];
  if (isHovered) sprocketState.push('hover');
  if (isFocused) sprocketState.push('focus');
  if (isFocusVisible) sprocketState.push('focus-visible');
  if (isDisabled) sprocketState.push('disabled');
  if (isPressed) sprocketState.push('pressed');
  if (isSelected) sprocketState.push('selected');

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
      'data-key': String(value),
      'aria-controls': isSelected ? tabPanelId : undefined,
      tabIndex: isDisabled
        ? undefined
        : (value == state.focusedKey || (state.focusedKey == null && isSelected))
          ? 0
          : -1,
      onFocus: onTabFocus,
      'data-hover': isHovered ? 'true' : undefined,
      'data-focus': isFocused ? 'true' : undefined,
      'data-focus-visible': isFocusVisible ? 'true' : undefined,
      'data-disabled': isDisabled ? 'true' : undefined,
      'data-pressed': isPressed ? 'true' : undefined,
      'data-selected': isSelected ? 'true' : undefined,
      'data-sprocket-state': sprocketState.length > 0 ? sprocketState.join(' ') : undefined
    }
  );

  return {
    tabId,
    tabProps,
    tabPanelId,
    isSelected,
    isDisabled,
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible,
    elementType: elementType as T,
  };
}
