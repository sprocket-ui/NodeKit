/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

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
 * Internal render function for the TooltipContent component. Handles context consumption,
 * floating positioning, transitions, and accessibility props for the tooltip overlay.
 * Not intended for public use; use the exported TooltipContent component instead.
 *
 * @param {TooltipContentProps} props - The props for the TooltipContent component.
 * @param {ForwardedRef<HTMLElement>} ref - The forwarded ref for the content element.
 * @returns {ReactElement | null} The rendered tooltip content or null.
 */
function TooltipContentFn(
	props: TooltipContentProps,
	ref: ForwardedRef<HTMLElement>
): ReactElement | null {
	// biome-ignore lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
	const context = useContext(TooltipContext);

	if (!context) {
		throw new Error('TooltipContent must be used within a <Tooltip> component.');
	}

	const { slot, ...restProps } = props;

	const {
		contentProps,
		elementType,
		isHovered,
		isMounted,
		refs,
		floatingStyles,
		finalPlacement,
		getFloatingProps,
		transitionStyles
		// biome-ignore lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
	} = useTooltipContent({ ...restProps, triggerRef: context.triggerRef }, context);

	const placementSide =
		(finalPlacement?.split('-')[0] as 'top' | 'bottom' | 'left' | 'right') ?? null;
	// biome-ignore lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
	const arrowContextValue = useMemo(() => ({ placement: placementSide }), [placementSide]);

	// biome-ignore lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
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
					...(renderProps.style as Record<string, unknown>)
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
 * Renders the tooltip overlay with positioning, transitions, and accessibility.
 * Must be used inside a Tooltip (root) component.
 *
 * @param {TooltipContentProps} props - The props for the TooltipContent component.
 * @param {ForwardedRef<HTMLElement>} ref - The forwarded ref for the content element.
 * @returns {ReactElement | null} The rendered tooltip content or null.
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
