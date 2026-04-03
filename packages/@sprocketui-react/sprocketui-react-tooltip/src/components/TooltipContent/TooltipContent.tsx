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

import { assert } from '@necto/assert';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { useRenderer } from '@necto-react/hooks';
import { PopperPortal } from '@necto-react/popper';
import { Primitive } from '@necto-react/components';
import { useContext, useMemo, forwardRef } from 'react';

import { TOOLTIP_CONTENT_NAME } from '../../constants';
import { useTooltipContent } from '../../hooks/useTooltipContent';
import { TooltipContext, TooltipArrowContext } from '../../contexts';

import type {
	ElementType,
	ForwardedRef,
	ReactElement,
	RefAttributes,
	ForwardRefExoticComponent
} from 'react';
import type { TooltipContentProps } from './TooltipContent.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the TooltipContent component.
 */
function TooltipContentFn(
	props: TooltipContentProps,
	ref: ForwardedRef<HTMLElement>
): ReactElement | null {
	const context = useContext(TooltipContext);

	assert(context, 'TooltipContent must be used within a <Tooltip> component.');

	const { slot, ...restProps } = props;

	const {
		contentProps,
		elementType,
		isHovered,
		isMounted,
		isPositioned,
		refs,
		arrowRef,
		arrowX,
		arrowY,
		floatingStyles,
		finalPlacement,
		getFloatingProps,
		transitionStyles
	} = useTooltipContent(
		{
			...restProps,
			triggerRef: context.triggerRef,
			isContentHoveredRef: context.isContentHoveredRef
		},
		context
	);

	const placementSide =
		(finalPlacement?.split('-')[0] as 'top' | 'bottom' | 'left' | 'right') ?? null;

	const arrowContextValue = useMemo(
		() => ({
			placement: placementSide,
			arrowX,
			arrowY,
			arrowRef
		}),
		[placementSide, arrowX, arrowY, arrowRef]
	);

	const renderProps: UseRendererReturn = useRenderer({
		...restProps,
		values: {
			placement: finalPlacement ?? null,
			isOpen: context.isOpen,
			isHovered
		},
		defaultClassName: buildInternalIdentifier({
			component: TOOLTIP_CONTENT_NAME
		}),
		style: (values) => ({
			...(props.style instanceof Function ? props.style(values) : props.style)
		})
	});

	// Use isMounted for transition support, fall back to isOpen for immediate show.
	const shouldRender = isMounted || context.isOpen;

	if (!shouldRender) return null;

	const floatingProps = getFloatingProps({
		ref: (node: HTMLElement | null): void => {
			refs.setFloating(node);
			if (typeof ref === 'function') ref(node);
			else if (ref) ref.current = node;
		}
	});

	return (
		<PopperPortal>
			<Primitive
				as={elementType}
				{...renderProps}
				{...floatingProps}
				{...mergeProps(contentProps)}
				id={context.tooltipId}
				style={{
					...floatingStyles,
					...transitionStyles,
					...(renderProps.style as Record<string, unknown>),
					...(!isPositioned && { visibility: 'hidden' })
				}}
				data-placement={finalPlacement ?? undefined}
				slot={slot || undefined}
			>
				<TooltipArrowContext.Provider value={arrowContextValue}>
					{renderProps.children}
				</TooltipArrowContext.Provider>
			</Primitive>
		</PopperPortal>
	);
}

/**
 * The public TooltipContent component for Sprocket UI.
 */
export const TooltipContent: ForwardRefExoticComponent<
	Omit<TooltipContentProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
> & {
	Root: ForwardRefExoticComponent<
		Omit<TooltipContentProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
	>;
} = Object.assign(
	forwardRef<HTMLElement, Omit<TooltipContentProps<ElementType>, 'ref'>>(
		(props: Omit<TooltipContentProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
			TooltipContentFn(props as TooltipContentProps, ref)
	),
	{
		Root: forwardRef<HTMLElement, Omit<TooltipContentProps<ElementType>, 'ref'>>(
			(props: Omit<TooltipContentProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
				TooltipContentFn(props as TooltipContentProps, ref)
		)
	}
);

TooltipContent.displayName = TOOLTIP_CONTENT_NAME;
