/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useRef } from 'react';

import { TOOLTIP_NAME } from '../../constants';
import { TooltipArrow } from '../TooltipArrow';
import { TooltipContext } from '../../contexts';
import { TooltipContent } from '../TooltipContent';
import { TooltipTrigger } from '../TooltipTrigger';
import { useTooltipTrigger, useTooltipTriggerState } from '../../hooks/useTooltipTrigger';

import type { ReactElement } from 'react';
import type { TooltipProps } from './Tooltip.types';

/**
 * Root Tooltip component for Sprocket UI.
 * Manages open/close state and provides context for Tooltip.Trigger,
 * Tooltip.Content, and Tooltip.Arrow. Renders no DOM element of its own.
 */
function TooltipRoot(props: TooltipProps): ReactElement {
  const { children, ...options } = props;

  const state = useTooltipTriggerState(options);
  const triggerRef = useRef<Element | null>(null);

  const { triggerProps, tooltipProps } = useTooltipTrigger(
    options,
    state,
    triggerRef
  );

  const contextValue = {
    isOpen: state.isOpen,
    open: state.open,
    close: state.close,
    triggerRef,
    triggerProps,
    tooltipId: tooltipProps.id
  };

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}

TooltipRoot.displayName = TOOLTIP_NAME;

/**
 * Tooltip with sub-components attached.
 *
 * Usage:
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger asChild>
 *     <button>Hover me</button>
 *   </Tooltip.Trigger>
 *   <Tooltip.Content>
 *     <Tooltip.Arrow />
 *     Tooltip text
 *   </Tooltip.Content>
 * </Tooltip>
 * ```
 */
export const Tooltip: typeof TooltipRoot & {
  Root: typeof TooltipRoot;
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
  Arrow: typeof TooltipArrow;
} = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow
});
