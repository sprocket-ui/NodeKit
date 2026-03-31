// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/suspicious/noExplicitAny: Explicit any is okay here.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { defu } from 'defu';
import { mergeProps } from '@necto/mergers';
import { useLocalState } from '@necto-react/state';
import { useCallback } from 'react';

import { useButton } from '../useButton/useButton';
import { DEFAULT_BUTTON_TAG } from '../../constants';

import type { ElementType, RefObject } from 'react';
import type { UseToggleButtonOptions, UseToggleButtonReturn } from './useToggleButton.types';

/**
 * React hook that provides all necessary props and state for a headless toggle button component.
 * Builds on top of useButton, adding selection state and aria-pressed.
 *
 * @template T The element type to render as (e.g., 'button', 'a', 'input').
 * @param {UseToggleButtonOptions<T>} props - The props for configuring the toggle button.
 * @param {RefObject<HTMLButtonElement>} ref - The ref to the button element.
 * @returns {UseToggleButtonReturn<T>} An object containing readonly state and props for the toggle button.
 */
export function useToggleButton<T extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: UseToggleButtonOptions<T>,
  ref: RefObject<HTMLButtonElement>
): UseToggleButtonReturn<T> {
  const {
    isSelected: controlledSelected,
    defaultSelected,
    onChange,
    onPress: onPressProp,
    ...buttonProps
  } = defu(props, {
    defaultSelected: false
  });

  const isControlled: boolean = controlledSelected !== undefined;
  const selectedState = useLocalState(defaultSelected);
  const isSelected: boolean = (isControlled ? controlledSelected : selectedState.value) as boolean;

  const onPress = useCallback(
    (e: any) => {
      const newValue: boolean = !isSelected;

      if (!isControlled) {
        selectedState.set(newValue);
      }

      onChange?.(newValue);
      onPressProp?.(e);
    },
    [isSelected, isControlled, onChange, onPressProp]
  );

  const result = useButton<T>(
    {
      ...buttonProps,
      onPress
    } as any,
    ref
  );

  const sprocketState: string[] = [];
  if (isSelected) sprocketState.push('selected');

  const toggleDataAttributes: Record<string, string | undefined> = {
    'data-selected': isSelected ? 'true' : undefined
  };

  const existingState: any = (result.buttonProps as any)['data-sprocket-state'];
  const combinedState: string = [existingState, ...sprocketState].filter(Boolean).join(' ');

  toggleDataAttributes['data-sprocket-state'] = combinedState || undefined;

  return {
    ...result,
    isSelected,
    buttonProps: mergeProps(result.buttonProps, {
      'aria-pressed': isSelected,
      ...toggleDataAttributes
    })
  };
}
