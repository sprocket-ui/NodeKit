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

import { TOGGLE_BUTTON_NAME } from '../../constants';
import { ToggleButtonContext } from '../../contexts';
import { useToggleButton } from '../../hooks/useToggleButton';

import type { ForwardedRef, ReactElement, RefAttributes, ForwardRefExoticComponent } from 'react';
import type { ToggleButtonProps } from './ToggleButton.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the ToggleButton component.
 */
function ToggleButtonFn(
	props: ToggleButtonProps,
	ref: ForwardedRef<HTMLButtonElement>
): ReactElement | null {
	[props, ref] = useContextProps({ props, ref, context: ToggleButtonContext as any });

	const {
		buttonProps,
		isHovered,
		isPressed,
		isFocused,
		isDisabled,
		isPending,
		isSelected,
		elementType,
		isFocusVisible
	} = useToggleButton(props, ref as any);

	const sprocketToggleButtonID: string = useId({ defaultId: buttonProps.id });
	const renderProps: UseRendererReturn = useRenderer({
		...props,
		values: {
			isHovered,
			isPressed,
			isFocused,
			isFocusVisible,
			isDisabled,
			isPending,
			isSelected
		},
		defaultClassName: buildInternalIdentifier({
			component: TOGGLE_BUTTON_NAME
		}),
		style: (values) => ({
			...(props.style instanceof Function ? props.style(values) : props.style)
		})
	});

	return (
		<Primitive
			ref={ref}
			as={elementType}
			id={sprocketToggleButtonID}
			slot={props.slot || undefined}
			{...renderProps}
			{...mergeProps(buttonProps)}
		>
			{renderProps.children}
		</Primitive>
	);
}

/**
 * A ToggleButton component for Sprocket UI.
 * Allows users to toggle a selection on or off.
 */
export const ToggleButton: ForwardRefExoticComponent<
	Omit<ToggleButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>
> & {
	Root: ForwardRefExoticComponent<
		Omit<ToggleButtonProps, 'ref'> & RefAttributes<HTMLButtonElement>
	>;
} = Object.assign(
	forwardRef<HTMLButtonElement, Omit<ToggleButtonProps, 'ref'>>(
		(props: Omit<ToggleButtonProps, 'ref'>, ref: ForwardedRef<HTMLButtonElement>) =>
			ToggleButtonFn(props as ToggleButtonProps, ref)
	),
	{
		Root: forwardRef<HTMLButtonElement, Omit<ToggleButtonProps, 'ref'>>(
			(props: Omit<ToggleButtonProps, 'ref'>, ref: ForwardedRef<HTMLButtonElement>) =>
				ToggleButtonFn(props as ToggleButtonProps, ref)
		)
	}
);

ToggleButton.displayName = TOGGLE_BUTTON_NAME;
