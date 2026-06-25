/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTabPanel } from '@sprocketui-react/tabs';

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

describe('Sprocket UI - useTabPanel', () => {
  test('tabPanelProps has role="tabpanel"', () => {
    const { result } = renderHook(() => useTabPanel({ value: 'a' }, makeState()));
    expect(result.current.tabPanelProps.role).toBe('tabpanel');
  });

  test('tabPanelProps has tabIndex=0', () => {
    const { result } = renderHook(() => useTabPanel({ value: 'a' }, makeState()));
    expect(result.current.tabPanelProps.tabIndex).toBe(0);
  });

  test('isSelected reflects state.selectedValue matching panel value', () => {
    const { result } = renderHook(() =>
      useTabPanel({ value: 'a' }, makeState({ selectedValue: 'a' }))
    );
    expect(result.current.isSelected).toBe(true);
    expect(result.current.tabPanelProps.hidden).toBe(false);
  });

  test('isSelected false when state.selectedValue differs', () => {
    const { result } = renderHook(() =>
      useTabPanel({ value: 'a' }, makeState({ selectedValue: 'b' }))
    );
    expect(result.current.isSelected).toBe(false);
    expect(result.current.tabPanelProps.hidden).toBe(true);
  });

  test('data-selected is "true" when selected, undefined otherwise', () => {
    const { result: sel } = renderHook(() =>
      useTabPanel({ value: 'a' }, makeState({ selectedValue: 'a' }))
    );
    expect(sel.current.tabPanelProps['data-selected']).toBe('true');

    const { result: unsel } = renderHook(() =>
      useTabPanel({ value: 'a' }, makeState({ selectedValue: 'b' }))
    );
    expect(unsel.current.tabPanelProps['data-selected']).toBeUndefined();
  });

  test('data-sprocket-state is "selected" when selected', () => {
    const { result } = renderHook(() =>
      useTabPanel({ value: 'a' }, makeState({ selectedValue: 'a' }))
    );
    expect(result.current.tabPanelProps['data-sprocket-state']).toBe('selected');
  });

  test('aria-labelledby points to the tab id derived from the same value', () => {
    const { result } = renderHook(() => useTabPanel({ value: 'a' }, makeState()));
    expect(result.current.tabPanelProps['aria-labelledby']).toBeTruthy();
    expect(result.current.tabPanelProps['aria-labelledby']).toContain('tab');
  });

  test('elementType defaults to div', () => {
    const { result } = renderHook(() => useTabPanel({ value: 'a' }, makeState()));
    expect(result.current.elementType).toBe('div');
  });

  test('elementType honors the `as` prop', () => {
    const { result } = renderHook(() => useTabPanel({ value: 'a', as: 'section' }, makeState()));
    expect(result.current.elementType).toBe('section');
  });

  test('elementType honors explicit elementType over `as`', () => {
    const { result } = renderHook(() =>
      useTabPanel({ value: 'a', as: 'section', elementType: 'article' }, makeState())
    );
    expect(result.current.elementType).toBe('article');
  });

  test('panel with undefined value only matches when state.selectedValue is also undefined', () => {
    const { result: noSel } = renderHook(() => useTabPanel({}, makeState()));
    expect(noSel.current.isSelected).toBe(false);

    const { result: matchedUndef } = renderHook(() =>
      useTabPanel({}, makeState({ selectedValue: undefined as any }))
    );
    expect(matchedUndef.current.isSelected).toBe(true);
  });
});
