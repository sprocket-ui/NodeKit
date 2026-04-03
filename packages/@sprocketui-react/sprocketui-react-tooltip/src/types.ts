/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/** State for tooltip, shared via context. */
export interface TooltipState {
	/** Whether the tooltip is currently open. */
	readonly isOpen: boolean;

	/** Open the tooltip. Pass immediate to skip warmup delay. */
	open(immediate?: boolean): void;

	/** Close the tooltip. Pass immediate to skip close delay. */
	close(immediate?: boolean): void;
}
