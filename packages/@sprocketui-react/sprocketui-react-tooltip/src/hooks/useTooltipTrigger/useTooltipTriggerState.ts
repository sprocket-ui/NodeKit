/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useLocalState } from '@necto-react/state';
import { useCallback } from 'react';

import type { UseTooltipTriggerOptions, UseTooltipTriggerStateReturn } from './useTooltipTrigger.types';

export function useTooltipTriggerState(
  options: UseTooltipTriggerOptions
): UseTooltipTriggerStateReturn {
  const {
    isOpen: isOpenControlled,
    defaultOpen = false,
    onOpenChange
  } = options;

  const openState = useLocalState(defaultOpen);
  const isControlled = isOpenControlled !== undefined;
  const isOpen = isControlled ? isOpenControlled : openState.value;

  const setOpen = useCallback((value: boolean): void => {
    if (!isControlled) {
      openState.set(value);
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
