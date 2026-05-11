/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useSelectionIndicator } from '@sprocketui-react/tabs';

import type { Key } from 'react';
import type { TabsState } from '@sprocketui-react/tabs';

function makeState(overrides: Partial<TabsState> = {}): TabsState {
  return {
    id: 'tabs-test',
    selectedValue: null,
    setSelectedValue: vi.fn() as (v: Key) => void,
    focusedKey: null,
    setFocusedKey: vi.fn() as (k: Key | null) => void,
    orientation: 'horizontal',
    activationMode: 'automatic',
    isDisabled: false,
    isValueDisabled: () => false,
    ...overrides
  };
}

describe('Sprocket UI - useSelectionIndicator', () => {
  test('isSelected false when state has no selectedValue', () => {
    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(null);
      return useSelectionIndicator({ state: makeState(), tabListRef });
    });
    expect(result.current.isSelected).toBe(false);
  });

  test('isSelected true when state has any selectedValue', () => {
    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(null);
      return useSelectionIndicator({
        state: makeState({ selectedValue: 'a' }),
        tabListRef
      });
    });
    expect(result.current.isSelected).toBe(true);
  });

  test('selectionIndicatorProps sets data-selected=true when selected', () => {
    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(null);
      return useSelectionIndicator({
        state: makeState({ selectedValue: 'a' }),
        tabListRef
      });
    });
    expect(result.current.selectionIndicatorProps['data-selected']).toBe('true');
    expect(result.current.selectionIndicatorProps['data-sprocket-state']).toBe('selected');
  });

  test('selectionIndicatorProps has undefined data-selected when nothing selected', () => {
    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(null);
      return useSelectionIndicator({ state: makeState(), tabListRef });
    });
    expect(result.current.selectionIndicatorProps['data-selected']).toBeUndefined();
    expect(result.current.selectionIndicatorProps['data-sprocket-state']).toBeUndefined();
  });

  test('metrics null when nothing is selected', () => {
    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(null);
      return useSelectionIndicator({ state: makeState(), tabListRef });
    });
    expect(result.current.metrics).toBeNull();
    expect(result.current.indicatorStyle).toEqual({});
  });

  test('metrics computed from DOM when a tab is selected', () => {
    const container = document.createElement('div');
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 300, height: 40, right: 300, bottom: 40, x: 0, y: 0, toJSON: () => ({}) })
    });

    const tab = document.createElement('div');
    tab.setAttribute('data-value', 'a');
    Object.defineProperty(tab, 'getBoundingClientRect', {
      value: () => ({ left: 10, top: 5, width: 80, height: 32, right: 90, bottom: 37, x: 10, y: 5, toJSON: () => ({}) })
    });
    container.appendChild(tab);

    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(container);
      return useSelectionIndicator({
        state: makeState({ selectedValue: 'a' }),
        tabListRef
      });
    });

    expect(result.current.metrics).toEqual({
      x: 10,
      y: 5,
      width: 80,
      height: 32
    });
  });

  test('indicatorStyle contains CSS custom properties when metrics exist', () => {
    const container = document.createElement('div');
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 300, height: 40, right: 300, bottom: 40, x: 0, y: 0, toJSON: () => ({}) })
    });

    const tab = document.createElement('div');
    tab.setAttribute('data-value', 'b');
    Object.defineProperty(tab, 'getBoundingClientRect', {
      value: () => ({ left: 100, top: 0, width: 60, height: 40, right: 160, bottom: 40, x: 100, y: 0, toJSON: () => ({}) })
    });
    container.appendChild(tab);

    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(container);
      return useSelectionIndicator({
        state: makeState({ selectedValue: 'b' }),
        tabListRef
      });
    });

    expect(result.current.indicatorStyle).toMatchObject({
      '--sprocketui-selection-indicator-x': '100px',
      '--sprocketui-selection-indicator-y': '0px',
      '--sprocketui-selection-indicator-width': '60px',
      '--sprocketui-selection-indicator-height': '40px'
    });
  });

  test('metrics null when selectedValue does not match any tab in the list', () => {
    const container = document.createElement('div');
    const tab = document.createElement('div');
    tab.setAttribute('data-value', 'a');
    container.appendChild(tab);

    const { result } = renderHook(() => {
      const tabListRef = useRef<HTMLElement | null>(container);
      return useSelectionIndicator({
        state: makeState({ selectedValue: 'nonexistent' }),
        tabListRef
      });
    });

    expect(result.current.metrics).toBeNull();
  });
});
