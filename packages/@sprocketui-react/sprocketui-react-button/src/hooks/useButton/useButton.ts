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

import {
  useHover,
  usePress,
  useFocusRing,
  useFocusable
} from '@necto-react/hooks';
import { defu } from 'defu';
import { HTMLElements } from '@necto/dom';
import { mergeProps } from '@necto/mergers';
import { filterDOMProps } from '@necto-react/helpers';
import { ANCHOR_ELEMENT_PROPS, ALLOWED_EXTERNAL_PROPS } from 'shared';

import { DEFAULT_BUTTON_TAG } from '../../constants';

import type { ElementType, RefObject } from 'react';
import type { UseButtonOptions, UseButtonReturn } from './useButton.types';

/**
 * React hook that provides all necessary props and state for a headless button component.
 *
 * @template T The element type to render as (e.g., 'button', 'a', 'input').
 * @param {UseButtonProps<T>} props - The props for configuring the button's behavior and accessibility.
 * @param {RefObject<HTMLButtonElement>} ref - The ref to the button element.
 * @returns {ButtonHookReturn<T>} An object containing readonly state and props for the button element.
 */
export function useButton<T extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: UseButtonOptions<T>,
  ref: RefObject<HTMLButtonElement>
): UseButtonReturn<T> {
  const {
    rel,
    href,
    target,
    autoFocus,
    focusDisabled,
    preventFocusOnPress,
    isDisabled,
    type,
    elementType,

    // Callbacks
    onClick,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange
  } = defu(props, {
    isDisabled: false,
    type: 'button' as const,
    as: DEFAULT_BUTTON_TAG,
    elementType: props.elementType || props.as || DEFAULT_BUTTON_TAG
  });

  let additionalProps: Record<string, unknown>;
  if (elementType === HTMLElements.Button) {
    additionalProps = {
      type,
      disabled: isDisabled
    };
  } else {
    additionalProps = {
      role: 'button',
      href: elementType === HTMLElements.A && !isDisabled ? href : undefined,
      target: elementType === HTMLElements.A ? target : undefined,
      type: elementType === HTMLElements.Input ? type : undefined,
      disabled: elementType === HTMLElements.Input ? isDisabled : undefined,
      'aria-disabled':
        !isDisabled || elementType === HTMLElements.Input
          ? undefined
          : isDisabled,
      rel: elementType === HTMLElements.A ? rel : undefined
    };
  }

  const { hoverProps, isHovered } = useHover({
    ...(props as any),
    isDisabled: isDisabled
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const { focusableProps } = useFocusable(props as any, ref);

  const { pressProps, isPressed } = usePress({
    ref,
    isDisabled,
    preventFocusOnPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    onPressUp,
    onClick: onClick as any
  });

  if (focusDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }

  const buttonProps: Record<string, any> = mergeProps(
    focusableProps,
    pressProps,
    hoverProps,
    focusProps,
    filterDOMProps(props, {
      allowLabelableProps: true,
      allowedLabelableProps: new Set([]),
      allowedLinkProps: new Set(ANCHOR_ELEMENT_PROPS),
      extraAllowedProps: new Set(ALLOWED_EXTERNAL_PROPS)
    })
  );

  const sprocketState: string[] = [];
  if (isHovered) sprocketState.push('hover');
  if (isFocused) sprocketState.push('focus');
  if (isFocusVisible) sprocketState.push('focus-visible');
  if (isDisabled) sprocketState.push('disabled');
  if (isPressed) sprocketState.push('pressed');

  const dataAttributes: Record<string, string | undefined> = {
    'data-hover': isHovered ? 'true' : undefined,
    'data-focus': isFocused ? 'true' : undefined,
    'data-focus-visible': isFocusVisible ? 'true' : undefined,
    'data-disabled': isDisabled ? 'true' : undefined,
    'data-pressed': isPressed ? 'true' : undefined,
    'data-sprocket-state': sprocketState.length > 0 ? sprocketState.join(' ') : undefined
  };

  return {
    isFocused,
    isPressed,
    isHovered,
    isDisabled,
    isFocusVisible,
    elementType: elementType as T,
    buttonProps: mergeProps(buttonProps, additionalProps, dataAttributes)
  } satisfies UseButtonReturn<T>;
}
