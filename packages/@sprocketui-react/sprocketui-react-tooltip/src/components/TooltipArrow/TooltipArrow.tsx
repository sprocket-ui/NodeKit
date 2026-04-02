/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useContext } from 'react';
import { PopperArrow } from '@necto-react/popper';

import { TooltipArrowContext } from '../../contexts';

import type { ReactElement } from 'react';
import type { TooltipArrowProps } from './TooltipArrow.types';

/**
 * @internal
 * Internal render function for the TooltipArrow component. Renders a div-based arrow
 * element that automatically positions itself based on the parent Tooltip's resolved placement.
 * Must be rendered inside a Tooltip.Content component.
 * Not intended for public use; use the exported TooltipArrow component instead.
 *
 * @param {TooltipArrowProps} props - The props for the TooltipArrow component.
 * @returns {ReactElement} The rendered arrow element.
 */
function TooltipArrowFn(props: TooltipArrowProps): ReactElement {
	const { placement } = useContext(TooltipArrowContext);

	return <PopperArrow placement={placement} {...props} />;
}

/**
 * The public TooltipArrow component for Sprocket UI.
 * Renders a positioned arrow element inside a Tooltip.Content component.
 *
 * @param {TooltipArrowProps} props - The props for the TooltipArrow component.
 * @returns {ReactElement} The rendered arrow element.
 */
export const TooltipArrow: typeof TooltipArrowFn & {
	Root: typeof TooltipArrowFn;
} = Object.assign(TooltipArrowFn, {
	Root: TooltipArrowFn
});
