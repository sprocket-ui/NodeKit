// biome-ignore-all lint/suspicious/noExplicitAny: Props records require any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context, RefObject } from 'react';
import type { TooltipState } from '../types';

export interface TooltipContextValue extends TooltipState {
	// Ref to the trigger element for positioning.
	triggerRef: RefObject<Element | null>;

	// Props to spread on the trigger element (from useTooltipTrigger).
	triggerProps: Record<string, any>;

	// The tooltip id (set by useTooltipTrigger, used for aria-describedby).
	tooltipId?: string;

	// Ref to track if the tooltip content is hovered (shared with trigger for close coordination).
	isContentHoveredRef?: RefObject<boolean>;
}

export const TooltipContext: Context<TooltipContextValue | null> =
	createContext<TooltipContextValue | null>(null);
