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
  useFocusRing,
  useFocusable,
  useAriaProps,
  useEffectEvent
} from '@necto-react/hooks';
import { defu } from 'defu';
import { mergeProps } from '@necto/mergers';
import { useLocalState } from '@necto-react/state';
import { HTMLElements, filterDOMProps } from '@necto/dom';

import {
  DEFAULT_INPUT_TAG,
  ALLOWED_EXTERNAL_PROPS,
  ALLOWED_INPUT_LABELABLE_PROPS
} from '../../constants';

import type { ElementType, RefObject } from 'react';
import type { UseInputProps, UseInputReturn } from './useInput.types';

/**
 * React hook that provides all necessary props and state for a headless input component.
 *
 * @template T The element type to render as (e.g., 'input', 'textarea').
 * @param {UseInputProps<T>} props - The props for configuring the input's behavior and accessibility.
 * @param {RefObject<any>} ref - The ref to the input element.
 * @returns {UseInputReturn<T>} An object containing readonly state and props for the input element.
 */
export function useInput<T extends ElementType = typeof DEFAULT_INPUT_TAG>(
  props: UseInputProps<T>,
  ref: RefObject<any>
): UseInputReturn<T> {
  const {
    autoFocus,
    clearable,
    isDisabled,
    isReadOnly,
    isRequired,
    elementType,
    defaultValue,
    value: controlledValue,

    // Callbacks
    onBlur,
    onClear,
    onFocus,
    onChange,
    onValueChange
  } = defu(props, {
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    clearable: false,
    as: DEFAULT_INPUT_TAG,
    elementType: props.elementType || props.as || DEFAULT_INPUT_TAG
  });

  const internalValue = useLocalState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue.value;

  const isInvalid: boolean = !!props['aria-invalid'] && props['aria-invalid'] !== 'false';

  const handleChange = useEffectEvent((e: any): void => {
    const newValue = e.target.value;
    if (!isControlled) {
      internalValue.set(newValue);
    }
    onChange?.(e);
    onValueChange?.(newValue);
  });

  const handleClear = useEffectEvent((): void => {
    if (!ref.current) return;
    if (!isControlled) {
      internalValue.set('');
    }
    ref.current.value = '';
    const event = new Event('input', { bubbles: true });
    ref.current.dispatchEvent(event);
    onClear?.();
    onValueChange?.('');
  });

  const ariaProps = useAriaProps({
    isInvalid,
    isDisabled,
    isReadOnly,
    isRequired
  });

  const additionalProps: Record<string, unknown> = {
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    ...ariaProps,
    ...(elementType !== HTMLElements.Input && elementType !== HTMLElements.Textarea && {
      role: 'textbox'
    })
  };

  const { hoverProps, isHovered } = useHover({
    ...(props as any),
    isDisabled: isDisabled
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    isTextInput: true,
    autoFocus
  });
  const { focusableProps } = useFocusable(props as any, ref);

  const inputProps: Record<string, any> = mergeProps(
    focusableProps,
    hoverProps,
    focusProps,
    filterDOMProps(props, {
      allowLabelableProps: true,
      allowedLabelableProps: new Set(ALLOWED_INPUT_LABELABLE_PROPS),
      additionalAllowedProps: new Set(ALLOWED_EXTERNAL_PROPS)
    }),
    {
      onChange: handleChange as any,
      onFocus: onFocus as any,
      onBlur: onBlur as any,
      value: value
    }
  );

  return {
    isFocused,
    isHovered,
    isDisabled,
    isReadOnly,
    isRequired,
    isFocusVisible,
    isInvalid,
    elementType: elementType as T,
    ...(clearable && { clearInput: handleClear }),
    inputProps: mergeProps(inputProps, additionalProps)
  } satisfies UseInputReturn<T>;
}
