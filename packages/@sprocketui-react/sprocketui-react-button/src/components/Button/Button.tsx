// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
// biome-ignore-all lint/suspicious/noExplicitAny: Polymorphic component requires any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef } from 'react';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContextProps, useRenderer, useId } from '@necto-react/hooks';

import { BUTTON_NAME } from '../../constants';
import { ButtonContext } from '../../contexts';
import { useButton } from '../../hooks/useButton';

import type { ForwardedRef, ReactElement, RefAttributes, ForwardRefExoticComponent } from 'react';
import type { ButtonProps } from './Button.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the Button component. Handles context, state, and prop merging for the button element.
 * Not intended for public use; use the exported Button component instead.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ForwardedRef<HTMLButtonElement>} ref - The forwarded ref for the button element.
 * @returns {ReactElement | null} The rendered button element or null.
 */
function ButtonFn(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement | null {
	[props, ref] = useContextProps({ props, ref, context: ButtonContext as any });

	const {
		buttonProps,
		isHovered,
		isPressed,
		isFocused,
		isDisabled,
		isPending,
		elementType,
		isFocusVisible
	} = useButton(props, ref as any);

	const renderProps: UseRendererReturn = useRenderer({
		...props,
		values: {
			isHovered,
			isPressed,
			isFocused,
			isFocusVisible,
			isDisabled,
			isPending
		},
		defaultClassName: buildInternalIdentifier({
			component: BUTTON_NAME
		}),
		style: (values) => ({
			...(props.style instanceof Function ? props.style(values) : props.style)
		})
	});

	return (
		<Primitive
			ref={ref}
			as={elementType}
			slot={props.slot || undefined}
			id={useId({ defaultId: buttonProps.id })}
			{...renderProps}
			{...mergeProps(buttonProps)}
		>
			{renderProps.children}
		</Primitive>
	);
}

/**
 * The public Button component for Sprocket UI.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ForwardedRef<HTMLButtonElement>} ref - The forwarded ref for the button element.
 * @returns {ReactElement | null} The rendered button element or null.
 */
export const Button: ForwardRefExoticComponent<
	Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>
> & {
	Root: ForwardRefExoticComponent<Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>>;
} = Object.assign(
	forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>(
		(props: Omit<ButtonProps, 'ref'>, ref: ForwardedRef<HTMLButtonElement>) =>
			ButtonFn(props as ButtonProps, ref)
	),
	{
		Root: forwardRef<HTMLButtonElement, Omit<ButtonProps, 'ref'>>(
			(props: Omit<ButtonProps, 'ref'>, ref: ForwardedRef<HTMLButtonElement>) =>
				ButtonFn(props as ButtonProps, ref)
		)
	}
);

Button.displayName = BUTTON_NAME;
