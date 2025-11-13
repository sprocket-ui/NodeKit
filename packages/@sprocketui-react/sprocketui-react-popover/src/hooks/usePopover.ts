// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/suspicious/noExplicitAny: Explicit any is okay here.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useMemo } from 'react';
import { mergeProps } from '@necto/mergers';
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  shift as shiftMiddleware,
  arrow as arrowMiddleware,
  hide as hideMiddleware,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager
} from '@floating-ui/react';
import { useScrollLock } from '@necto-react/hooks';

import type { PopoverState } from '../components/Popover.types';
import type { UsePopoverProps, UsePopoverReturn } from './usePopover.types';

/**
 * React hook that provides all necessary props and state for a headless popover component.
 */
export function usePopover(
  props: UsePopoverProps,
  state: PopoverState
): UsePopoverReturn {
  const {
    triggerRef,
    popoverRef,
    arrowRef,
    isNonModal = false,
    isKeyboardDismissDisabled = false,
    shouldCloseOnInteractOutside,
    placement = 'bottom',
    strategy = 'absolute',
    offset: offsetValue = 8,
    flip = true,
    shift = true,
    containerPadding = 8,
    hideWhenDetached = false,
    middleware: customMiddleware
  } = props;

  const middleware = useMemo(() => {
    const middlewares = customMiddleware || [
      offsetValue !== undefined && offsetMiddleware(offsetValue),
      flip && flipMiddleware({ padding: containerPadding }),
      shift && shiftMiddleware({ padding: containerPadding }),
      arrowRef && arrowMiddleware({ element: arrowRef }),
      hideWhenDetached && hideMiddleware()
    ];
    return middlewares.filter(Boolean);
  }, [
    customMiddleware,
    offsetValue,
    flip,
    shift,
    containerPadding,
    arrowRef,
    hideWhenDetached
  ]);

  const { refs, floatingStyles, context, placement: finalPlacement, middlewareData, isPositioned } = useFloating({
    open: state.isOpen,
    onOpenChange: (open) => {
      if (open) {
        state.open();
      } else {
        state.close();
      }
    },
    placement,
    strategy,
    middleware,
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context, {
    enabled: !isNonModal
  });

  const dismiss = useDismiss(context, {
    enabled: !isKeyboardDismissDisabled,
    outsidePress: shouldCloseOnInteractOutside
      ? (event) => {
          const target = event.target as Element;
          return shouldCloseOnInteractOutside(target);
        }
      : true
  });

  const role = useRole(context, {
    role: 'dialog'
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  useScrollLock({
    autoLock: isNonModal || !state.isOpen
  });

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;

  return {
    isOpen: state.isOpen,
    isPositioned,
    placement: finalPlacement,
    floatingStyles,
    popoverProps: getFloatingProps({
      ref: refs.setFloating,
      style: floatingStyles
    }),
    arrowProps: {
      ref: arrowRef,
      style: {
        position: 'absolute',
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : ''
      }
    },
    underlayProps: {
      onClick: state.close
    }
  } satisfies UsePopoverReturn;
}
