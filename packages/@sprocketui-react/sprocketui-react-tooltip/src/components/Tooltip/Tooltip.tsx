// biome-ignore-all lint/correctness/useHookAtTopLevel: Internal Fn pattern, called via forwardRef.
// biome-ignore-all lint/correctness/noUnusedFunctionParameters: ref is part of the public signature for API consistency.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef, useRef } from 'react';

import { TooltipArrow } from '../TooltipArrow';
import { TOOLTIP_NAME } from '../../constants';
import { TooltipContext } from '../../contexts';
import { TooltipContent } from '../TooltipContent';
import { TooltipTrigger } from '../TooltipTrigger';
import { useTooltipTrigger, useTooltipTriggerState } from '../../hooks/useTooltipTrigger';

import type { TooltipState } from '../../types';
import type { TooltipProps } from './Tooltip.types';
import type {
	RefObject,
	ForwardedRef,
	ReactElement,
	RefAttributes,
	ForwardRefExoticComponent
} from 'react';

/**
 * @internal
 * Internal render function for the Tooltip component.
 *
 * Tooltip is a logical context provider and renders no DOM element of its own,
 * matching the behavior of Radix UI and React Aria Components. The `ref` parameter
 * is accepted for API consistency with the rest of the Sprocket component family
 * but is intentionally unused.
 */
function TooltipFn(props: TooltipProps, ref: ForwardedRef<HTMLElement>): ReactElement {
	const { children, closeOnContentHover = false, ...options } = props;

	const state: TooltipState = useTooltipTriggerState(options);
	const isContentHoveredRef: RefObject<boolean> = useRef(false);
	const triggerRef: RefObject<Element | null> = useRef<Element | null>(null);

	const { triggerProps, tooltipProps } = useTooltipTrigger(
		options,
		state,
		triggerRef,
		closeOnContentHover ? isContentHoveredRef : undefined
	);

	const contextValue = {
		triggerRef,
		triggerProps,
		open: state.open,
		close: state.close,
		isOpen: state.isOpen,
		tooltipId: tooltipProps.id,
		isContentHoveredRef: closeOnContentHover ? isContentHoveredRef : undefined
	};

	return <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>;
}

/**
 * A Tooltip component for Sprocket UI.
 * Provides context for Tooltip.Trigger and Tooltip.Content. Renders no DOM element.
 */
export const Tooltip: ForwardRefExoticComponent<
	Omit<TooltipProps, 'ref'> & RefAttributes<HTMLElement>
> & {
	Root: ForwardRefExoticComponent<Omit<TooltipProps, 'ref'> & RefAttributes<HTMLElement>>;
	Trigger: typeof TooltipTrigger;
	Content: typeof TooltipContent;
	Arrow: typeof TooltipArrow;
} = Object.assign(
	forwardRef<HTMLElement, Omit<TooltipProps, 'ref'>>(
		(props: Omit<TooltipProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
			TooltipFn(props as TooltipProps, ref)
	),
	{
		Root: forwardRef<HTMLElement, Omit<TooltipProps, 'ref'>>(
			(props: Omit<TooltipProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
				TooltipFn(props as TooltipProps, ref)
		),
		Trigger: TooltipTrigger,
		Content: TooltipContent,
		Arrow: TooltipArrow
	}
);

Tooltip.displayName = TOOLTIP_NAME;
