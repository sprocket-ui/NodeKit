/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useState, useCallback } from 'react';

import type { UseTooltipTriggerOptions, UseTooltipTriggerStateReturn } from './useTooltipTrigger.types';

export function useTooltipTriggerState(
  options: UseTooltipTriggerOptions
): UseTooltipTriggerStateReturn {
  const {
    isOpen: isOpenControlled,
    defaultOpen = false,
    onOpenChange
  } = options;

  const [isOpenUncontrolled, setIsOpenUncontrolled] = useState(defaultOpen);
  const isControlled = isOpenControlled !== undefined;
  const isOpen = isControlled ? isOpenControlled : isOpenUncontrolled;

  const setOpen = useCallback((value: boolean): void => {
    if (!isControlled) {
      setIsOpenUncontrolled(value);
    }
    onOpenChange?.(value);
  }, [isControlled, onOpenChange]);

  return {
    isOpen,
    open(immediate?: boolean) {
      setOpen(true);
    },
    close(immediate?: boolean) {
      setOpen(false);
    }
  };
}
