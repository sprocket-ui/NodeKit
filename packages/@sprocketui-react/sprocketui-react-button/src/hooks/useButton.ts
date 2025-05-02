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

import type { ElementType, HTMLAttributes, RefObject } from 'react';
import type { ButtonOptions } from '@sprocketui-types/button';

const DEFAULT_BUTTON_TAG = HTMLElements.Button;

interface ButtonHookProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> extends ButtonOptions<TTag> {
  elementType?: string;
  preventFocusOnPress?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: any) => void;
  onPress?: (e: any) => void;
  onPressStart?: (e: any) => void;
  onPressEnd?: (e: any) => void;
  onPressUp?: (e: any) => void;
  onPressChange?: (isPressed: boolean) => void;
  [key: string]: any;
}

interface ButtonHookResult<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> extends HTMLAttributes<any> {
  Tag: TTag;
  buttonProps: HTMLAttributes<any>;
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
}

function useButton<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ButtonHookProps<TTag>,
  ref: RefObject<any>
): ButtonHookResult<TTag> {
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
    Tag: Tag as TTag,
    isPressed,
    isHovered,
    isDisabled,
    isFocused,
    isFocusVisible,
    buttonProps: mergeReactProps(buttonProps, additionalProps),
  }
}

export {
  useButton,
  type ButtonHookProps,
  type ButtonHookResult
}