// biome-ignore-all assist/source/organizeImports: No need to sort imports.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useRef, useState, useCallback } from 'react';
import { PopoverContext } from '../contexts/PopoverContext';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverContent } from './PopoverContent';

import type { ReactElement } from 'react';
import type { PopoverProps } from './Popover.types';
import type { PopoverContextValue } from '../contexts/PopoverContext';

const POPOVER_NAME = 'Popover' as const;

/**
 * Root component for the Popover. Manages state and provides context.
 */
function PopoverRoot(props: PopoverProps): ReactElement {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    modal = true,
    children
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLElement>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const open = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  const contextValue: PopoverContextValue = {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    popoverRef,
    arrowRef,
    isNonModal: !modal
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
}

PopoverRoot.displayName = POPOVER_NAME;

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
});
