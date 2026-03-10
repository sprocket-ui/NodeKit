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

import { TOOLTIP_ARROW_NAME } from '../../constants';
import { TooltipArrowContext } from '../../contexts';

import type { ReactElement } from 'react';
import type { TooltipArrowProps } from './TooltipArrow.types';

/**
 * A TooltipArrow component for Sprocket UI.
 * Renders a div-based arrow element that automatically positions itself
 * based on the parent Tooltip's resolved placement. Must be rendered
 * inside a Tooltip.Content component.
 */
function TooltipArrowFn(props: TooltipArrowProps): ReactElement {
  const { placement } = useContext(TooltipArrowContext);

  return (
    <PopperArrow
      placement={placement}
      {...props}
    />
  );
}

TooltipArrowFn.displayName = TOOLTIP_ARROW_NAME;

export const TooltipArrow: typeof TooltipArrowFn & {
  Root: typeof TooltipArrowFn;
} = Object.assign(TooltipArrowFn, {
  Root: TooltipArrowFn
});
