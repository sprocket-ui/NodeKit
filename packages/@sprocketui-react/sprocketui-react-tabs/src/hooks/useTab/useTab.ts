/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import {
  useId,
  useHover,
  usePress,
  useFocusRing,
  useFocusable,
  useAriaProps
} from '@necto-react/hooks';
import { defu } from 'defu';
import { useCallback } from 'react';
import { mergeProps } from '@necto/mergers';

import { generateId } from '../../utils';
import { DEFAULT_TAB_TAG } from '../../constants';

import type { TabsState } from '../../types';
import type { UseTabOptions, UseTabReturn } from './useTab.types';
import type { Key, ElementType, RefObject, AriaAttributes } from 'react';

export function useTab<T extends ElementType = typeof DEFAULT_TAB_TAG>(
  options: UseTabOptions<T>,
  state: TabsState,
  ref: RefObject<any>
): UseTabReturn<T> {
  const {
    value,
    autoFocus,
    elementType,
    preventFocusOnPress,
    isDisabled: isDisabledProp,

    // Callbacks
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
  } = defu(options, {
    isDisabled: false,
    elementType: options.elementType || options.as || DEFAULT_TAB_TAG
  });

  // Keep useId unconditional so React's hook order stays stable on renders.
  // Don't inline it into `value ?? useId({})`, that would call hook conditionally.
  const autoId: string = useId({});
  const resolvedValue: Key = value ?? autoId;

  const isSelected: boolean = resolvedValue === state.selectedValue;
  const isDisabled: boolean = isDisabledProp || state.isValueDisabled(resolvedValue);

  const tabId: string = generateId(state, resolvedValue, 'tab');
  const tabPanelId: string = generateId(state, resolvedValue, 'tabpanel');

  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusableProps } = useFocusable({ isDisabled } as any, ref);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const ariaProps: AriaAttributes = useAriaProps({ isSelected, isDisabled });

  const onTabFocus = useCallback((): void => {
    if (!isDisabled) {
      state.setFocusedKey(resolvedValue);
    }
  }, [state, resolvedValue, isDisabled]);

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
        state.setSelectedValue(resolvedValue);
      }

      onPress?.(e);
    }
  });

  const sprocketState: string[] = [
    isHovered && 'hover',
    isFocused && 'focus',
    isFocusVisible && 'focus-visible',
    isDisabled && 'disabled',
    isPressed && 'pressed',
    isSelected && 'selected'
  ].filter(Boolean) as string[];

  const tabProps: Record<string, any> = mergeProps(
    focusableProps,
    pressProps,
    hoverProps,
    focusProps,
    ariaProps,
    {
      id: tabId,
      role: 'tab',
      'data-value': String(resolvedValue),
      'data-key': String(resolvedValue),
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
    resolvedValue,
    isFocusVisible,
    elementType: elementType as T,
  };
}
