// biome-ignore-all assist/source/organizeImports: No need to sort imports.

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
import { Primitive } from '@necto-react/components';
import { InputContext } from '../contexts';
import { useInput } from '../hooks/useInput';
import { useContextProps, useRenderer, useId } from '@necto-react/hooks';
import { INPUT_NAME } from '../constants';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { InputProps } from './Input.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the Input component. Handles context, state, and prop merging for the input element.
 * Not intended for public use; use the exported Input component instead.
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {ForwardedRef<HTMLInputElement>} ref - The forwarded ref for the input element.
 * @returns {ReactElement | null} The rendered input element or null.
 */
function InputFn(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement | null {
  [props, ref] = useContextProps({ props, ref, context: InputContext });

  const {
    inputProps,
    isHovered,
    isFocused,
    isDisabled,
    isReadOnly,
    isRequired,
    elementType,
    isFocusVisible,
    isInvalid
  } = useInput(props, ref as any);

  const sprocketInputID = useId({ defaultId: inputProps.id });
  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {
      isHovered,
      isFocused,
      isFocusVisible,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid
    },
    defaultClassName: buildInternalIdentifier({
      component: INPUT_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  const dataAttributes = useMemo(() => {
    const stateAttributes: Record<string, boolean | undefined> = {
      hover: isHovered,
      focus: isFocused,
      focusVisible: isFocusVisible,
      disabled: isDisabled,
      readonly: isReadOnly,
      required: isRequired,
      invalid: isInvalid
    };

    const attributes: Record<string, string | undefined> = {};
    const sprocketState: string[] = [];

    for (const [key, value] of Object.entries(stateAttributes)) {
      if (typeof value === 'boolean') {
        attributes[`data-${kebabCase(key)}`] = value ? String(true) : undefined;
        if (value) {
          sprocketState.push(kebabCase(key));
        }
      }
    }

    return {
      ...attributes,
      'data-sprocket-state': sprocketState.join(' ')
    };
  }, [isHovered, isFocused, isFocusVisible, isDisabled, isReadOnly, isRequired, isInvalid]);

  return (
    <Primitive
      ref={ref}
      as={elementType}
      {...renderProps}
      {...mergeProps(inputProps, dataAttributes)}
      id={sprocketInputID}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * The public Input component for Sprocket UI.
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {ForwardedRef<HTMLInputElement>} ref - The forwarded ref for the input element.
 * @returns {ReactElement | null} The rendered input element or null.
 */
export const Input: ForwardRefExoticComponent<
  Omit<InputProps, 'ref'> & RefAttributes<HTMLInputElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<InputProps, 'ref'> & RefAttributes<HTMLInputElement>
  >;
} = Object.assign(
  forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>((props: Omit<InputProps, 'ref'>, ref: ForwardedRef<HTMLInputElement>) =>
    InputFn(props as InputProps, ref)
  ),
  {
    Root: forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(
      (props: Omit<InputProps, 'ref'>, ref: ForwardedRef<HTMLInputElement>) => InputFn(props as InputProps, ref)
    )
  }
);

Input.displayName = INPUT_NAME;
