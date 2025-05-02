 /**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { kebabCase } from "@necto/strings";
import { useFocusable } from "react-aria"; // Temp use, will be removed in later version
import { mergeReactProps } from "@necto/mergers";
import { filterDOMProps } from "@necto-react/helpers";
import { ANCHOR_ELEMENT_PROPS } from "@necto/constants";
import { ButtonTypeValues } from "@sprocketui-types/button";
import { HTMLAttributes, ElementType, useMemo } from "react";
import { usePress, useHover, useDisabled, useFocusRing, useId } from '@necto-react/hooks';

import type { RefObject } from "react";
import type { FocusableElement } from "@necto-react/types";
import type { ButtonOptions } from "@sprocketui-types/button";

const DEFAULT_BUTTON_TAG = 'button' as const;
const DEFAULT_BUTTON_TYPE = ButtonTypeValues.Button as const;

interface ButtonHookProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> extends ButtonOptions<TTag> {
  isDisabled: boolean,
  slot?: Record<string, any>;
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

interface ButtonHookResult<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> {
  buttonProps: HTMLAttributes<HTMLElement>;
  Tag: TTag;
  combinedSlot: Record<string, any>;
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
  id: string;
}

function useButton<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ButtonHookProps<TTag>,
  ref: RefObject<HTMLElement> | undefined
): ButtonHookResult<TTag> {
  const {
    as: Tag = DEFAULT_BUTTON_TAG as TTag,
    elementType = Tag as string,
    disabled: propDisabled,
    isDisabled: propIsDisabled,
    autoFocus,
    slot = {},
    preventFocusOnPress,
    focusDisabled,
    href,
    target,
    rel,
    type = DEFAULT_BUTTON_TYPE,
    onClick,
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
  } = props;

  const id = useId();
  const isDisabled = useDisabled('general', propDisabled || propIsDisabled) || false;
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus });
  const { isHovered, hoverProps } = useHover({ ...props, isDisabled });
  const { pressProps, isPressed } = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress,
    onPressUp,
    onClick,
    isDisabled,
    preventFocusOnPress,
    ref: ref as any // Temp type error remediation
  });

  // Additional props based on element type
  let additionalProps;
  if (elementType === 'button') {
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

  // Handle focusable props
  const { focusableProps } = useFocusable(props, ref as RefObject<FocusableElement>);
  if (focusDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }

  // Combine slot props
  const combinedSlot = useMemo(() => ({
    ...slot,
    hover: isHovered,
    focus: isFocused,
    focusVisible: isFocusVisible,
    disabled: isDisabled,
    pressed: isPressed
  }), [slot, isHovered, isFocused, isFocusVisible, isDisabled, isPressed]);

  // Generate data attributes
  const dataAttributes = useMemo(() => {
    const attributes: Record<string, string | undefined> = {};

    for (const [key, value] of Object.entries(combinedSlot)) {
      if (typeof value === 'boolean') {
        attributes[`data-${kebabCase(key)}`] = value ? 'true' : undefined;
      }
    }

    return attributes;
  }, [combinedSlot]);

  let baseButtonProps = mergeReactProps(focusableProps, pressProps, filterDOMProps(props, {
    includeLabelableProps: true,
    labelablePropsSet: new Set([ ]), // Keep this empty for now,
    linkPropsSet: new Set(ANCHOR_ELEMENT_PROPS),
    additionalAllowedProps: new Set(['id', 'className', 'style', 'data-*', 'aria-*'])
  }));

  const buttonProps = useMemo(() =>
    mergeReactProps(
      {
        id,
        'data-sprocket-state': [
          isHovered && 'hover',
          isFocused && 'focus',
          isPressed && 'pressed',
          isDisabled && 'disabled',
        ]
          .filter(Boolean)
          .join(' ') || '',
        ...dataAttributes,
        disabled: isDisabled
      },
      additionalProps,
      baseButtonProps,
      focusProps,
      hoverProps,
      Tag !== 'button' && Tag !== DEFAULT_BUTTON_TAG
        ? { role: 'button' }
        : { type: type as any }
    ),
    [
      isHovered,
      isFocused,
      isPressed,
      isDisabled,
      dataAttributes,
      additionalProps,
      baseButtonProps,
      focusProps,
      hoverProps,
      Tag,
      type,
      id
    ]
  );

  return {
    Tag,
    buttonProps,
    combinedSlot,
    isPressed,
    isHovered,
    isFocused,
    isFocusVisible,
    isDisabled,
    id
  };
};

export {
  useButton,
  type ButtonHookProps,
  type ButtonHookResult
}