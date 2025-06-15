/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { kebabCase } from '@necto/strings';
import { mergeProps } from '@necto/mergers';
import { forwardRef, useMemo } from 'react';
import { useButton } from '../hooks/useButton';
import { buildInternalIdentifier } from 'shared';
import { ButtonContext } from '../hooks/useButtonContext';
import { useContextProps, useRenderProps, useId } from '@necto-react/hooks';

import type { RenderProps } from "@necto-react/types";
import type { ButtonHookProps } from '../hooks/useButton';
import type { ButtonOptions } from '@sprocketui-types/button';
import type { ElementType, ForwardedRef, ReactElement } from 'react';

const BUTTON_NAME = 'Button' as const;

interface ButtonProps extends ButtonOptions<ElementType>, RenderProps<any>, ButtonHookProps<ElementType> {
  // Slot values for React rendering.
  slot?: string | null;
};

function ButtonFn(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement | null {
  [props, ref] = useContextProps({ props, ref, context: ButtonContext });

  const {
    buttonProps,
    isDisabled,
    isHovered,
    isPressed,
    isFocused,
    isFocusVisible,
    elementType: Tag,
  } = useButton(props, ref);

  const sprocketButtonID = useId({ defaultId: buttonProps.id });
  const renderProps = useRenderProps({
    ...props,
    values: {
      isHovered,
      isPressed,
      isFocused,
      isFocusVisible,
      isDisabled,
      // isPending
    },
    defaultClassName: buildInternalIdentifier({
      component: BUTTON_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style),
    }),
  });

  const dataAttributes = useMemo(() => {
    const stateAttributes: Record<string, boolean | undefined> = {
      hover: isHovered,
      focus: isFocused,
      focusVisible: isFocusVisible,
      disabled: isDisabled,
      pressed: isPressed,
    };

    const attributes: Record<string, string | undefined> = {};
    const sprocketState: string[] = [];

    for (const [key, value] of Object.entries(stateAttributes)) {
      if (typeof value === 'boolean') {
        attributes[`data-${kebabCase(key)}`] = value ? 'true' : undefined;
        if (value) {
          sprocketState.push(kebabCase(key));
        }
      }
    }

    return {
      ...attributes,
      'data-sprocket-state': sprocketState.join(' '),
    };
  }, [isHovered, isFocused, isFocusVisible, isDisabled, isPressed]);

  return (
    <Tag
      {...renderProps}
      {...mergeProps(buttonProps, dataAttributes)}
      ref={ref}
      id={sprocketButtonID}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Tag>
  )
}

const Button = Object.assign(
  forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>((props, ref) => ButtonFn(props as ButtonProps, ref)),
  { Root: forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>((props, ref) => ButtonFn(props as ButtonProps, ref)) }
);

Button.displayName = BUTTON_NAME;

export {
  Button,
  type ButtonProps
}