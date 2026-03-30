/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps } from '@necto/mergers';
import { useContext, cloneElement } from 'react';

import { TooltipContext } from '../../contexts';
import { TOOLTIP_TRIGGER_NAME } from '../../constants';

import type { ReactElement } from 'react';
import type { TooltipContextValue } from '../../contexts';
import type { TooltipTriggerProps } from './TooltipTrigger.types';

/**
 * The trigger element for a Tooltip.
 * Wraps a single child element and merges hover/focus/accessibility
 * props from the parent Tooltip context. Must be used inside a Tooltip (root).
 */
function TooltipTriggerFn(props: TooltipTriggerProps): ReactElement {
  const { children } = props;
  const context: TooltipContextValue | null = useContext(TooltipContext);

  if (!context) {
    return children;
  }

  return cloneElement(
    children,
    mergeProps(
      children.props as Record<string, any>,
      context.triggerProps,
      { ref: context.triggerRef }
    )
  );
}

TooltipTriggerFn.displayName = TOOLTIP_TRIGGER_NAME;

export const TooltipTrigger: typeof TooltipTriggerFn & {
  Root: typeof TooltipTriggerFn;
} = Object.assign(TooltipTriggerFn, {
  Root: TooltipTriggerFn
});
