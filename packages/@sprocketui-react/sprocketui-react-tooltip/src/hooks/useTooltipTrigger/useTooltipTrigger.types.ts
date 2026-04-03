// biome-ignore-all lint/suspicious/noExplicitAny: Props records require any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { TooltipState } from '../../types';

/** Options for useTooltipTrigger hook. */
export interface UseTooltipTriggerOptions {
	/** Whether the tooltip trigger is disabled. */
	isDisabled?: boolean;

	/** What triggers the tooltip. @default 'hover' */
	trigger?: 'hover' | 'focus';

	/** Delay in ms before the tooltip opens. @default 1500 */
	delay?: number;

	/** Delay in ms before the tooltip closes. @default 500 */
	closeDelay?: number;

	/** Whether pressing the trigger should close the tooltip. @default true */
	shouldCloseOnPress?: boolean;

	/** Whether the tooltip stays open when hovering its content. @default false */
	closeOnContentHover?: boolean;

	/** Controlled open state. */
	isOpen?: boolean;

	/** Default open state (uncontrolled). @default false */
	defaultOpen?: boolean;

	/** Callback when open state changes. */
	onOpenChange?: (isOpen: boolean) => void;
}

/** Return value from useTooltipTriggerState hook. */
export type UseTooltipTriggerStateReturn = TooltipState;

/** Return value from useTooltipTrigger hook. */
export type UseTooltipTriggerReturn = Readonly<{
	/** Props to spread on the trigger element. */
	triggerProps: Record<string, any>;

	/** Props to spread on the tooltip element (contains the id). */
	tooltipProps: Record<string, any>;
}>;
