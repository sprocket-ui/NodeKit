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
	triggerRef: RefObject<Element | null>;
	triggerProps: Record<string, any>;
	tooltipId?: string;
	isContentHoveredRef?: RefObject<boolean>;
}

export const TooltipContext: Context<TooltipContextValue | null> =
	createContext<TooltipContextValue | null>(null);
