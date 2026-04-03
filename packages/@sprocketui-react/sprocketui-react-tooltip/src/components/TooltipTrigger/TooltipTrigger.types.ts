/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ReactElement } from 'react';

/** Props for the TooltipTrigger component. */
export interface TooltipTriggerProps {
	/** The trigger element. Must be a single React element. */
	children: ReactElement;

	/** When true, merges props onto the child element instead of wrapping it. @default true */
	asChild?: boolean;
}
