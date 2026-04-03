/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context } from 'react';

export interface TooltipArrowContextValue {
	placement: 'top' | 'bottom' | 'left' | 'right' | null;
	arrowX?: number;
	arrowY?: number;
	arrowRef?: (node: HTMLDivElement | null) => void;
}

export const TooltipArrowContext: Context<TooltipArrowContextValue> =
	createContext<TooltipArrowContextValue>({
		placement: null
	});
