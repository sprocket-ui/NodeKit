/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { DOM } from "@necto/constants";
import { HTMLElements } from "@necto/dom";
import { useFocusable } from "react-aria"; // Temp use, will be removed in later version
import { mergeProps } from "@necto/mergers";
import { filterDOMProps } from "@necto-react/helpers";
import { useHover, usePress, useFocusRing } from "@necto-react/hooks";

import type { ElementType, RefObject } from 'react';
import type { UseButtonProps, ButtonHookReturn } from './useButton.types';

export const DEFAULT_BUTTON_TAG = HTMLElements.Button;

export function useButton<T extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: UseButtonProps<T>,
  ref: RefObject<any>
): ButtonHookReturn<T> {
  const {
    rel,
    href,
    target,
    autoFocus,
    isDisabled,
    focusDisabled,
    preventFocusOnPress,
    type = DEFAULT_BUTTON_TAG,

    // Duplicate props for convenance.
    as: Tag = DEFAULT_BUTTON_TAG,
    elementType = Tag || DEFAULT_BUTTON_TAG,

    // Callbacks handlers.
    onClick,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
  } = props;

  let additionalProps;
  if (elementType === HTMLElements.Button) {
    additionalProps = {
      type,
      disabled: isDisabled
    };
  } else {
    additionalProps = {
      role: 'button',
      href: elementType === 'a' && !isDisabled ? href : undefined,
      target: elementType === 'a' ? target : undefined,
      type: elementType === 'input' ? type : undefined,
      disabled: elementType === 'input' ? isDisabled : undefined,
      'aria-disabled': !isDisabled || elementType === 'input' ? undefined : isDisabled,
      rel: elementType === 'a' ? rel : undefined
    };
  }

  const { hoverProps, isHovered } = useHover({ ...props, isDisabled: isDisabled});
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const { focusableProps } = useFocusable(props, ref);

  const { pressProps, isPressed } = usePress({
    ref,
    isDisabled,
    preventFocusOnPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    onPressUp,
    onClick,
  });

  if (focusDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }

  const buttonProps = mergeProps(focusableProps, pressProps, hoverProps, focusProps, filterDOMProps(props, {
    allowLabelableProps: true,
    allowedLabelableProps: new Set(new Array()),
    allowedLinkProps: new Set(DOM.ANCHOR_ELEMENT_PROPS),
    extraAllowedProps: new Set(['id', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'value'])
  }));

  return {
    isFocused,
    isPressed,
    isHovered,
    isDisabled,
    isFocusVisible,
    elementType: elementType as T,
    buttonProps: mergeProps(buttonProps, additionalProps),
  }
}