/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react';

/** Render props for the TooltipArrow component. */
export interface TooltipArrowRenderProps {
	/** The placement of the tooltip relative to the trigger. */
	placement: 'top' | 'bottom' | 'left' | 'right' | null;
}

/** Props for the TooltipArrow component. */
export interface TooltipArrowProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children'> {
	/** Ref to the arrow element. */
	ref?: RefObject<HTMLDivElement | null>;

	/** Arrow content or render function. */
	children?: ReactNode | ((renderProps: TooltipArrowRenderProps) => ReactNode);

	/** Custom styles for the arrow element. */
	style?: CSSProperties;

	/** CSS class name for the arrow element. */
	className?: string;
}
