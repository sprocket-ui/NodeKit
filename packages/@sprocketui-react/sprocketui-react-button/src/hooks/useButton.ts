/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { HTMLElements } from "@necto/dom";
import { useFocusable } from "react-aria"; // Temp use, will be removed in later version
import { mergeReactProps } from "@necto/mergers";
import { filterDOMProps } from "@necto-react/helpers";
import { ANCHOR_ELEMENT_PROPS } from "@necto/constants";
import { useHover, useFocusRing, usePress } from "@necto-react/hooks";

import type { ButtonOptions } from '@sprocketui-types/button';
import type { ElementType, HTMLAttributes, RefObject } from 'react';

const DEFAULT_BUTTON_TAG = HTMLElements.Button;

interface ButtonHookProps<E extends ElementType> extends ButtonOptions<E> {
  // Element to render the button as.
  elementType?: string;

  // Prevents focus of element on press events.
  preventFocusOnPress?: boolean;

  // Location to route the button to.
  href?: string;

  // The target that will be used for the href routing.
  target?: string;

  // Relationship HTML linker option.
  rel?: string;

  // User click callback handler.
  onClick?: (e: any) => void;

  // User press callback handler.
  onPress?: (e: any) => void;

  // User press start callback handler.
  onPressStart?: (e: any) => void;

  // User press end callback handler.
  onPressEnd?: (e: any) => void;

  // User press up callback handler.
  onPressUp?: (e: any) => void;

  // User press change callback handler.
  onPressChange?: (isPressed: boolean) => void;

  // Other normalized props and specified keys.
  [key: string]: any; // This might need to be removed to add some slight operation to the framework.
}

interface ButtonHookResult<T extends ElementType = ElementType> {
  elementType: T;
  buttonProps: HTMLAttributes<any>;
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
}

function useButton<T extends ElementType = ElementType>(
  props: ButtonHookProps<T>,
  ref: RefObject<any>
): ButtonHookResult<T> {
  const {
    preventFocusOnPress,
    focusDisabled,
    href,
    target,
    autoFocus,
    rel,
    type = DEFAULT_BUTTON_TAG,

    // Duplicate props for convenance.
    as: Tag = DEFAULT_BUTTON_TAG,
    elementType = Tag || DEFAULT_BUTTON_TAG,
    disabled,
    isDisabled = disabled,

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
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    onPressUp,
    onClick,
    isDisabled,
    preventFocusOnPress,
    ref
  });

  if (focusDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }

  const buttonProps = mergeReactProps(focusableProps, pressProps, hoverProps, focusProps, filterDOMProps(props, {
    includeLabelableProps: true,
    labelablePropsSet: new Set(new Array()),
    linkPropsSet: new Set(ANCHOR_ELEMENT_PROPS),
    additionalAllowedProps: new Set(['id', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'value'])
  }));

  return {
    isPressed,
    isHovered,
    isDisabled,
    isFocused,
    isFocusVisible,
    elementType: elementType as T,
    buttonProps: mergeReactProps(buttonProps, additionalProps),
  }
}

export {
  useButton,
  type ButtonHookProps,
  type ButtonHookResult
}