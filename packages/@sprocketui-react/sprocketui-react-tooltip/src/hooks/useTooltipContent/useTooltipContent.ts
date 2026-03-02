/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { defu } from 'defu';
import {
  flip,
  shift,
  autoUpdate,
  offset as offsetMiddleware,
} from '@necto/popper';
import {
  useRole,
  usePopper,
  useDismiss,
  useInteractions,
  useTransitionStyles
} from '@necto-react/popper';
import { mergeProps } from '@necto/mergers';
import { useHover } from '@necto-react/hooks';

import { DEFAULT_TOOLTIP_TAG } from '../../constants';

import type { ElementType } from 'react';
import type { TooltipState } from '../../types';
import type { UseTooltipContentOptions, UseTooltipContentReturn } from './useTooltipContent.types';

export function useTooltipContent<T extends ElementType = typeof DEFAULT_TOOLTIP_TAG>(
  options: UseTooltipContentOptions<T>,
  state: TooltipState
): UseTooltipContentReturn<T> {
  const {
    elementType,
    placement = 'top',
    offset: offsetValue = 6,
    transitionDuration = 150,
  } = defu(options, {
    elementType: options.elementType || options.as || DEFAULT_TOOLTIP_TAG
  });

  const { isOpen } = state;

  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => state.open(true),
    onHoverEnd: () => state.close()
  });

  const { refs, floatingStyles, placement: finalPlacement } = usePopper({
    open: isOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offsetMiddleware(offsetValue), flip(), shift()],
  });

  const dismiss = useDismiss({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) state.close();
    }
  });

  const role = useRole({
    open: isOpen,
    role: 'tooltip'
  });

  const { getFloatingProps } = useInteractions([dismiss, role]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles({
    open: isOpen,
    duration: transitionDuration,
    initial: { opacity: 0, transform: 'scale(0.95)' },
    openStyles: { opacity: 1, transform: 'scale(1)' }
  });

  const sprocketState: string[] = [];
  if (isHovered) sprocketState.push('hover');
  if (isOpen) sprocketState.push('open');

  const contentProps: Record<string, any> = mergeProps(
    hoverProps,
    {
      role: 'tooltip',
      'data-hover': isHovered ? 'true' : undefined,
      'data-open': isOpen ? 'true' : undefined,
      'data-sprocket-state': sprocketState.length > 0 ? sprocketState.join(' ') : undefined
    }
  );

  return {
    refs,
    isHovered,
    isMounted,
    contentProps,
    floatingStyles,
    finalPlacement,
    transitionStyles,
    getFloatingProps,
    elementType: elementType as T,
  };
}
