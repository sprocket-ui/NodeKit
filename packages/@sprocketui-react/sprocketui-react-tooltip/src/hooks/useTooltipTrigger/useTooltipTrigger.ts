/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps } from '@necto/mergers';
import { useEffect, useRef } from 'react';
import { useHover, useFocusable, useId, getInteractionModality } from '@necto-react/hooks';

import { TOOLTIP_TRIGGER_COOLDOWN, TOOLTIP_TRIGGER_DELAY } from "../../constants";

import type { RefObject } from 'react';
import type { TooltipState } from '../../types';
import type { UseTooltipTriggerOptions, UseTooltipTriggerReturn } from './useTooltipTrigger.types';


let globalWarmedUp: boolean = false;
let globalWarmUpTimeout: ReturnType<typeof setTimeout> | null = null;
let globalCooldownTimeout: ReturnType<typeof setTimeout> | null = null;

export function useTooltipTrigger(
  options: UseTooltipTriggerOptions,
  state: TooltipState,
  ref: RefObject<any>
): UseTooltipTriggerReturn {
  const {
    isDisabled = false,
    trigger = 'hover',
    delay = TOOLTIP_TRIGGER_DELAY,
    closeDelay = TOOLTIP_TRIGGER_COOLDOWN,
    shouldCloseOnPress = true
  } = options;

  const tooltipId: string = useId();

  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleShow = (): void => {
    if (isHoveredRef.current || isFocusedRef.current) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      globalWarmedUp = true;
      state.open(true);

      if (globalWarmUpTimeout) {
        clearTimeout(globalWarmUpTimeout);
        globalWarmUpTimeout = null;
      }
      if (globalCooldownTimeout) {
        clearTimeout(globalCooldownTimeout);
        globalCooldownTimeout = null;
      }
    }
  };

  const handleHide = (immediate?: boolean): void => {
    if (isHoveredRef.current || isFocusedRef.current) {
      return;
    }

    if (immediate || closeDelay <= 0) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      state.close(true);
    } else if (!closeTimeoutRef.current) {
      closeTimeoutRef.current = setTimeout(() => {
        closeTimeoutRef.current = null;
        state.close(true);
      }, closeDelay);
    }

    if (globalWarmUpTimeout) {
      clearTimeout(globalWarmUpTimeout);
      globalWarmUpTimeout = null;
    }
    if (globalWarmedUp) {
      if (globalCooldownTimeout) {
        clearTimeout(globalCooldownTimeout);
      }
      globalCooldownTimeout = setTimeout(() => {
        globalCooldownTimeout = null;
        globalWarmedUp = false;
      }, Math.max(TOOLTIP_TRIGGER_COOLDOWN, closeDelay));
    }
  };

  const warmupTooltip = (): void => {
    if (!state.isOpen && !globalWarmedUp) {
      if (globalWarmUpTimeout) {
        clearTimeout(globalWarmUpTimeout);
      }
      globalWarmUpTimeout = setTimeout(() => {
        globalWarmUpTimeout = null;
        globalWarmedUp = true;
        handleShow();
      }, delay);
    } else if (!state.isOpen) {
      handleShow();
    }
  };

  const { hoverProps } = useHover({
    isDisabled,
    onHoverStart() {
      if (trigger === 'focus') return;
      isHoveredRef.current = true;
      warmupTooltip();
    },
    onHoverEnd() {
      if (trigger === 'focus') return;
      isFocusedRef.current = false;
      isHoveredRef.current = false;
      handleHide();
    }
  });

  const { focusableProps } = useFocusable({
    isDisabled,
    onFocus() {
      if (getInteractionModality() !== 'pointer') {
        isFocusedRef.current = true;
        handleShow();
      }
    },
    onBlur() {
      isFocusedRef.current = false;
      isHoveredRef.current = false;
      handleHide(true);
    }
  } as any, ref);

  const onPressStart = (): void => {
    if (!shouldCloseOnPress) return;
    isFocusedRef.current = false;
    isHoveredRef.current = false;
    handleHide(true);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && state.isOpen) {
        e.stopPropagation();
        state.close(true);
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', onKeyDown, true);
      return (): void => document.removeEventListener('keydown', onKeyDown, true);
    }
  }, [state]);

  useEffect(() => {
    return (): void => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (globalWarmUpTimeout) {
        clearTimeout(globalWarmUpTimeout);
        globalWarmUpTimeout = null;
      }
    };
  }, []);

  return {
    triggerProps: mergeProps(focusableProps, hoverProps, {
      'aria-describedby': state.isOpen ? tooltipId : undefined,
      onPointerDown: onPressStart,
      onKeyDown: onPressStart
    }),
    tooltipProps: {
      id: tooltipId
    }
  };
}
