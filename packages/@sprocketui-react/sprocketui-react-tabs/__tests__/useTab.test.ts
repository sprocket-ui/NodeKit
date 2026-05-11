/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useTab } from '@sprocketui-react/tabs';

import type { Key } from 'react';
import type { TabsState } from '@sprocketui-react/tabs';

function makeState(overrides: Partial<TabsState> = {}): TabsState {
  const setSelected = vi.fn();
  const setFocused = vi.fn();
  return {
    id: 'tabs-test',
    selectedValue: null,
    setSelectedValue: setSelected as (v: Key) => void,
    focusedKey: null,
    setFocusedKey: setFocused as (k: Key | null) => void,
    orientation: 'horizontal',
    activationMode: 'automatic',
    isDisabled: false,
    isValueDisabled: () => false,
    ...overrides
  };
}

describe('Sprocket UI - useTab', () => {
  test('returns tabProps with role="tab"', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState(), ref);
    });

    expect(result.current.tabProps.role).toBe('tab');
  });

  test('returns data-value equal to passed value', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'my-value' }, makeState(), ref);
    });
    expect(result.current.tabProps['data-value']).toBe('my-value');
  });

  test('auto-generates a value when none is passed (resolvedValue is truthy)', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({}, makeState(), ref);
    });

    expect(result.current.resolvedValue).toBeTruthy();
    expect(result.current.tabProps['data-value']).toBe(String(result.current.resolvedValue));
  });

  test('auto-generated values are unique across two hook instances', () => {
    const { result: r1 } = renderHook(() => {
      const ref = useRef(null);
      return useTab({}, makeState(), ref);
    });
    const { result: r2 } = renderHook(() => {
      const ref = useRef(null);
      return useTab({}, makeState(), ref);
    });

    expect(r1.current.resolvedValue).not.toBe(r2.current.resolvedValue);
  });

  test('isSelected reflects state.selectedValue matching this tab', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a' }), ref);
    });
    expect(result.current.isSelected).toBe(true);
  });

  test('isSelected is false when state has a different selectedValue', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'b' }), ref);
    });
    expect(result.current.isSelected).toBe(false);
  });

  test('isDisabled true when option is passed disabled', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a', isDisabled: true }, makeState(), ref);
    });
    expect(result.current.isDisabled).toBe(true);
  });

  test('isDisabled true when state.isValueDisabled returns true', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab(
        { value: 'a' },
        makeState({ isValueDisabled: (v) => v === 'a' }),
        ref
      );
    });
    expect(result.current.isDisabled).toBe(true);
  });

  test('tabId and tabPanelId differ for the same value', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState(), ref);
    });
    expect(result.current.tabId).not.toBe(result.current.tabPanelId);
    expect(result.current.tabId).toContain('tab');
    expect(result.current.tabPanelId).toContain('tabpanel');
  });

  test('aria-controls points to tabPanelId when selected', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a' }), ref);
    });
    expect(result.current.tabProps['aria-controls']).toBe(result.current.tabPanelId);
  });

  test('aria-controls is undefined when not selected', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'b' }), ref);
    });
    expect(result.current.tabProps['aria-controls']).toBeUndefined();
  });

  test('tabIndex=0 when selected and no focused key', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a', focusedKey: null }), ref);
    });
    expect(result.current.tabProps.tabIndex).toBe(0);
  });

  test('tabIndex=-1 when another tab has focus', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a', focusedKey: 'b' }), ref);
    });
    expect(result.current.tabProps.tabIndex).toBe(-1);
  });

  test('tabIndex is undefined when disabled', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a', isDisabled: true }, makeState(), ref);
    });
    expect(result.current.tabProps.tabIndex).toBeUndefined();
  });

  test('elementType defaults to div', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState(), ref);
    });
    expect(result.current.elementType).toBe('div');
  });

  test('elementType honors the `as` prop', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a', as: 'button' }, makeState(), ref);
    });
    expect(result.current.elementType).toBe('button');
  });

  test('data-selected is "true" when selected, undefined otherwise', () => {
    const { result: selected } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a' }), ref);
    });
    expect(selected.current.tabProps['data-selected']).toBe('true');

    const { result: unselected } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'b' }), ref);
    });
    expect(unselected.current.tabProps['data-selected']).toBeUndefined();
  });

  test('data-sprocket-state aggregates active states', () => {
    const { result } = renderHook(() => {
      const ref = useRef(null);
      return useTab({ value: 'a' }, makeState({ selectedValue: 'a' }), ref);
    });
    const state = result.current.tabProps['data-sprocket-state'] ?? '';
    expect(state).toMatch(/selected/);
  });
});
