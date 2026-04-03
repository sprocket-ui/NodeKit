// biome-ignore-all lint/suspicious/noExplicitAny: Props records require any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { defu } from 'defu';
import { useMemo, useRef, useCallback, useState } from 'react';
import { flip, shift, arrow, autoUpdate, offset as offsetMiddleware } from '@necto/popper';
import {
	useRole,
	usePopper,
	useDismiss,
	useInteractions,
	useTransitionStyles
} from '@necto-react/popper';
import { mergeProps } from '@necto/mergers';
import { useHover } from '@necto-react/hooks';

import { DEFAULT_TOOLTIP_TAG } from '../../constants';

import type { ElementType } from 'react';
import type { TooltipState } from '../../types';
import type { UseTooltipContentOptions, UseTooltipContentReturn } from './useTooltipContent.types';

export function useTooltipContent<T extends ElementType = typeof DEFAULT_TOOLTIP_TAG>(
	options: UseTooltipContentOptions<T>,
	state: TooltipState
): UseTooltipContentReturn<T> {
	const {
		elementType,
		placement = 'top',
		offset: offsetValue = 6,
		transitionDuration = 150
	} = defu(options, {
		elementType: options.elementType || options.as || DEFAULT_TOOLTIP_TAG
	});

	// Extract refs directly from options to avoid defu potentially
	// deep-merging RefObjects.
	const triggerRef = options.triggerRef;
	const isContentHoveredRef = options.isContentHoveredRef;

	const { isOpen } = state;

	const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
	const arrowRef = useCallback((node: HTMLDivElement | null) => {
		setArrowElement(node);
	}, []);
	const contentCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { hoverProps, isHovered } = useHover({
		onHoverStart: () => {
			if (!isContentHoveredRef) return;
			(isContentHoveredRef as { current: boolean }).current = true;
			if (contentCloseTimeoutRef.current) {
				clearTimeout(contentCloseTimeoutRef.current);
				contentCloseTimeoutRef.current = null;
			}
			state.open(true);
		},
		onHoverEnd: () => {
			if (!isContentHoveredRef) return;
			(isContentHoveredRef as { current: boolean }).current = false;
			if (contentCloseTimeoutRef.current) {
				clearTimeout(contentCloseTimeoutRef.current);
			}
			contentCloseTimeoutRef.current = setTimeout(() => {
				contentCloseTimeoutRef.current = null;
				if (!isContentHoveredRef?.current) {
					state.close();
				}
			}, 150);
		}
	});

	const middleware = useMemo(
		() => [offsetMiddleware(offsetValue), flip(), shift(), arrow({ element: arrowElement })],
		[offsetValue, arrowElement]
	);

	const {
		refs,
		floatingStyles,
		placement: finalPlacement,
		isPositioned,
		middlewareData
	} = usePopper({
		open: isOpen,
		placement,
		transform: false,
		whileElementsMounted: autoUpdate,
		middleware,
		reference: triggerRef?.current
	});

	const dismiss = useDismiss({
		open: isOpen,
		onOpenChange: (open) => {
			if (!open) state.close();
		}
	});

	const role = useRole({
		open: isOpen,
		role: 'tooltip'
	});

	const { getFloatingProps } = useInteractions([dismiss, role]);

	const { isMounted, styles: transitionStyles } = useTransitionStyles({
		open: isOpen && isPositioned,
		duration: transitionDuration,
		initial: { opacity: 0 },
		openStyles: { opacity: 1 }
	});

	const sprocketState: string[] = [];
	if (isHovered) sprocketState.push('hover');
	if (isOpen) sprocketState.push('open');

	const contentProps: Record<string, any> = mergeProps(hoverProps, {
		role: 'tooltip',
		'data-open': isOpen ? 'true' : undefined,
		'data-hover': isHovered ? 'true' : undefined,
		'data-sprocket-state': sprocketState.length > 0 ? sprocketState.join(' ') : undefined
	});

	const arrowData = middlewareData?.arrow as { x?: number; y?: number } | undefined;

	return {
		refs,
		arrowRef,
		arrowX: arrowData?.x,
		arrowY: arrowData?.y,
		isHovered,
		isMounted,
		isPositioned,
		contentProps,
		floatingStyles,
		finalPlacement,
		transitionStyles,
		getFloatingProps,
		elementType: elementType as T
	};
}
