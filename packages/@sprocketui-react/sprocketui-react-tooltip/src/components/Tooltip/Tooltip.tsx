/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useRef } from 'react';

import { TooltipArrow } from '../TooltipArrow';
import { TOOLTIP_NAME } from '../../constants';
import { TooltipContext } from '../../contexts';
import { TooltipContent } from '../TooltipContent';
import { TooltipTrigger } from '../TooltipTrigger';
import { useTooltipTrigger, useTooltipTriggerState } from '../../hooks/useTooltipTrigger';

import type { ReactElement } from 'react';
import type { TooltipProps } from './Tooltip.types';
import type { TooltipState } from '../../types';

/**
 * @internal
 * Internal render function for the Tooltip component.
 */
function TooltipFn(props: TooltipProps): ReactElement {
	const { children, closeOnContentHover = false, ...options } = props;

	const state: TooltipState = useTooltipTriggerState(options);
	const triggerRef = useRef<Element | null>(null);
	const isContentHoveredRef = useRef(false);

	const { triggerProps, tooltipProps } = useTooltipTrigger(
		options,
		state,
		triggerRef,
		closeOnContentHover ? isContentHoveredRef : undefined
	);

	const contextValue = {
		isOpen: state.isOpen,
		open: state.open,
		close: state.close,
		triggerRef,
		triggerProps,
		tooltipId: tooltipProps.id,
		isContentHoveredRef: closeOnContentHover ? isContentHoveredRef : undefined
	};

	return <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>;
}

/**
 * A Tooltip component for Sprocket UI.
 */
export const Tooltip: typeof TooltipFn & {
	displayName?: string;
	Root: typeof TooltipFn;
	Trigger: typeof TooltipTrigger;
	Content: typeof TooltipContent;
	Arrow: typeof TooltipArrow;
} = Object.assign(TooltipFn, {
	Root: TooltipFn,
	Trigger: TooltipTrigger,
	Content: TooltipContent,
	Arrow: TooltipArrow
});

Tooltip.displayName = TOOLTIP_NAME;
