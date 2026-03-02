/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';
import type { RenderProps } from '@necto-react/types';

export interface TooltipContentRenderProps {
  // The resolved placement of the tooltip.
  placement: string | null;

  // Whether the tooltip is currently open.
  isOpen: boolean;

  // Whether the tooltip content is hovered.
  isHovered: boolean;
}

export interface TooltipContentProps<T extends ElementType = 'div'>
  extends RenderProps<TooltipContentRenderProps> {
  // The element type to render as. @default 'div'
  elementType?: T;

  // Shorthand for elementType.
  as?: T;

  // Slot name for context props.
  slot?: string | null;

  // Placement of the tooltip relative to the trigger. @default 'top'
  placement?: 'top' | 'bottom' | 'left' | 'right';

  // Offset distance from the trigger in pixels. @default 6
  offset?: number;

  // Duration of the enter/exit transition in ms. @default 150
  transitionDuration?: number;
}
