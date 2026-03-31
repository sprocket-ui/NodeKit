/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useLocalState } from '@necto-react/state';
import { useCallback, useLayoutEffect, useEffect } from 'react';

import type {
  SelectionIndicatorMetrics,
  UseSelectionIndicatorOptions,
  UseSelectionIndicatorReturn
} from './useSelectionIndicator.types';
import type { CSSProperties } from 'react';

export function useSelectionIndicator(
  options: UseSelectionIndicatorOptions
): UseSelectionIndicatorReturn {
  const { state, tabListRef } = options;

  const isSelected: boolean = state.selectedValue != null;
  const metricsState = useLocalState<SelectionIndicatorMetrics | null>(null);

  const measure: () => void = useCallback((): void => {
    const container: HTMLElement | null = tabListRef.current;

    if (!container || state.selectedValue == null) {
      metricsState.set(null);
      return;
    }

    const tabElement: Element | null = container.querySelector(
      `[data-value="${CSS.escape(String(state.selectedValue))}"]`
    );

    if (!tabElement) {
      metricsState.set(null);
      return;
    }

    const containerRect: DOMRect = container.getBoundingClientRect();
    const tabRect: DOMRect = tabElement.getBoundingClientRect();

    metricsState.set({
      x: tabRect.left - containerRect.left,
      y: tabRect.top - containerRect.top,
      width: tabRect.width,
      height: tabRect.height
    });
  }, [tabListRef, state.selectedValue]);

  useLayoutEffect((): void => {
    measure();
  }, [measure]);

  useEffect(() => {
    const container: HTMLElement | null = tabListRef.current;

    if (!container || typeof ResizeObserver === 'undefined') {
      return;
    };

    const observer = new ResizeObserver((): void => {
      measure();
    });

    observer.observe(container);

    return (): void => {
      observer.disconnect();
    };
  }, [tabListRef, measure]);

  const indicatorStyle: CSSProperties = metricsState.value
    ? {
        '--sprocketui-selection-indicator-x': `${metricsState.value.x}px`,
        '--sprocketui-selection-indicator-y': `${metricsState.value.y}px`,
        '--sprocketui-selection-indicator-width': `${metricsState.value.width}px`,
        '--sprocketui-selection-indicator-height': `${metricsState.value.height}px`
      } as CSSProperties
    : {};

  const selectionIndicatorProps: Record<string, any> = {
    'data-selected': isSelected ? 'true' : undefined,
    'data-sprocket-state': isSelected ? 'selected' : undefined
  };

  return {
    isSelected,
    metrics: metricsState.value,
    indicatorStyle,
    selectionIndicatorProps
  };
}
