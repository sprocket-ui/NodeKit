/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

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

  const isSelected = state.selectedValue != null;
  const [metrics, setMetrics] = useState<SelectionIndicatorMetrics | null>(null);

  const measure = useCallback(() => {
    const container = tabListRef.current;

    if (!container || state.selectedValue == null) {
      setMetrics(null);
      return;
    }

    const tabElement = container.querySelector(
      `[data-value="${CSS.escape(String(state.selectedValue))}"]`
    );

    if (!tabElement) {
      setMetrics(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();

    setMetrics({
      x: tabRect.left - containerRect.left,
      y: tabRect.top - containerRect.top,
      width: tabRect.width,
      height: tabRect.height
    });
  }, [tabListRef, state.selectedValue]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const container = tabListRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [tabListRef, measure]);

  const indicatorStyle: CSSProperties = metrics
    ? {
        '--sprocketui-selection-indicator-x': `${metrics.x}px`,
        '--sprocketui-selection-indicator-y': `${metrics.y}px`,
        '--sprocketui-selection-indicator-width': `${metrics.width}px`,
        '--sprocketui-selection-indicator-height': `${metrics.height}px`
      } as CSSProperties
    : {};

  const selectionIndicatorProps: Record<string, any> = {
    'data-selected': isSelected ? 'true' : undefined,
    'data-sprocket-state': isSelected ? 'selected' : undefined
  };

  return {
    isSelected,
    metrics,
    indicatorStyle,
    selectionIndicatorProps
  };
}
