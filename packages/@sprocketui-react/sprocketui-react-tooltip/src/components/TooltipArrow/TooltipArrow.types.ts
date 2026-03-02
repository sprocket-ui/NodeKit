/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react';

export interface TooltipArrowRenderProps {
  // The placement of the tooltip relative to the trigger.
  placement: 'top' | 'bottom' | 'left' | 'right' | null;
}

export interface TooltipArrowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children'> {
  ref?: RefObject<HTMLDivElement | null>;
  children?: ReactNode | ((renderProps: TooltipArrowRenderProps) => ReactNode);
  style?: CSSProperties;
  className?: string;
}
