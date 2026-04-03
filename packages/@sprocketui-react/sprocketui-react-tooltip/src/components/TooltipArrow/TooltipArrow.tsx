/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { PopperArrow } from '@necto-react/popper';
import { useContext } from 'react';

import { TOOLTIP_ARROW_NAME } from '../../constants';
import { TooltipArrowContext } from '../../contexts';

import type { ReactElement } from 'react';
import type { TooltipArrowProps } from './TooltipArrow.types';

/**
 * @internal
 * Internal render function for the TooltipArrow component.
 */
function TooltipArrowFn(props: TooltipArrowProps): ReactElement {
	const { placement, arrowX, arrowY, arrowRef } = useContext(TooltipArrowContext);

	return (
		<PopperArrow ref={arrowRef} placement={placement} arrowX={arrowX} arrowY={arrowY} {...props} />
	);
}

/**
 * A TooltipArrow component for Sprocket UI.
 */
export const TooltipArrow: typeof TooltipArrowFn & {
	displayName?: string;
	Root: typeof TooltipArrowFn;
} = Object.assign(TooltipArrowFn, {
	Root: TooltipArrowFn
});

TooltipArrow.displayName = TOOLTIP_ARROW_NAME;
