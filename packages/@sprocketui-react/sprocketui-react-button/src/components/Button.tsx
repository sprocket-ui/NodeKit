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
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@sprocketui-react/primitive';
import { useButton, ButtonContext } from '@sprocketui-react/button';
import { useContextProps, useRenderer, useId } from '@necto-react/hooks';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { ButtonProps } from './Button.types';

const BUTTON_NAME = 'Button' as const;

/**
 * @internal
 * Internal render function for the Button component. Handles context, state, and prop merging for the button element.
 * Not intended for public use; use the exported Button component instead.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ForwardedRef<HTMLButtonElement>} ref - The forwarded ref for the button element.
 * @returns {ReactElement | null} The rendered button element or null.
 */
function ButtonFn(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement | null {
  [props, ref] = useContextProps({ props, ref, context: ButtonContext });

  const {
    buttonProps,
    isHovered,
    isPressed,
    isFocused,
    isDisabled,
    elementType,
    isFocusVisible,
  } = useButton(props, ref as any);

  const sprocketButtonID = useId({ defaultId: buttonProps.id });
  const renderProps = useRenderer({
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
    <Primitive.Root
      as={elementType}
      {...renderProps}
      {...mergeProps(buttonProps, dataAttributes)}
      ref={ref}
      id={sprocketButtonID}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Primitive.Root>
  );
};

/**
 * The public Button component for Sprocket UI.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ForwardedRef<HTMLButtonElement>} ref - The forwarded ref for the button element.
 * @returns {ReactElement | null} The rendered button element or null.
 */
export const Button: ForwardRefExoticComponent<Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>> & {
  Root: ForwardRefExoticComponent<Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>>;
} = Object.assign(
  forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>((props, ref) => ButtonFn(props as ButtonProps, ref)),
  { Root: forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>((props, ref) => ButtonFn(props as ButtonProps, ref)) }
);

Button.displayName = BUTTON_NAME;