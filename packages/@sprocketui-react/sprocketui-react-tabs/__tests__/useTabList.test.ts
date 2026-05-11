/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useTabList } from '@sprocketui-react/tabs';

describe('Sprocket UI - useTabList', () => {
  test('returns state, elementType, and tabListProps', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({}, ref);
    });

    expect(result.current.state).toBeDefined();
    expect(result.current.elementType).toBe('div');
    expect(result.current.tabListProps).toBeDefined();
  });

  test('tabListProps has role=tablist', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({}, ref);
    });
    expect(result.current.tabListProps.role).toBe('tablist');
  });

  test('tabListProps carries aria-orientation', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ orientation: 'vertical' }, ref);
    });
    expect(result.current.tabListProps['aria-orientation']).toBe('vertical');
  });

  test('state.orientation defaults to horizontal', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({}, ref);
    });
    expect(result.current.state.orientation).toBe('horizontal');
  });

  test('state.selectedValue starts null when no default given', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({}, ref);
    });
    expect(result.current.state.selectedValue).toBeNull();
  });

  test('state.selectedValue starts at defaultSelectedValue (uncontrolled)', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ defaultSelectedValue: 'x' }, ref);
    });
    expect(result.current.state.selectedValue).toBe('x');
  });

  test('state.selectedValue tracks controlled selectedValue', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ selectedValue: 'y' }, ref);
    });
    expect(result.current.state.selectedValue).toBe('y');
  });

  test('setSelectedValue updates internal state when uncontrolled', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ defaultSelectedValue: 'a' }, ref);
    });

    act(() => {
      result.current.state.setSelectedValue('b');
    });

    expect(result.current.state.selectedValue).toBe('b');
  });

  test('setSelectedValue calls onSelectionChange', () => {
    const onSelectionChange = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ onSelectionChange }, ref);
    });

    act(() => {
      result.current.state.setSelectedValue('z');
    });

    expect(onSelectionChange).toHaveBeenCalledWith('z');
  });

  test('controlled mode: setSelectedValue does NOT change state, only fires callback', () => {
    const onSelectionChange = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ selectedValue: 'a', onSelectionChange }, ref);
    });

    act(() => {
      result.current.state.setSelectedValue('b');
    });

    expect(result.current.state.selectedValue).toBe('a');
    expect(onSelectionChange).toHaveBeenCalledWith('b');
  });

  test('isValueDisabled returns true for values in disabledValues', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ disabledValues: ['x', 'y'] }, ref);
    });

    expect(result.current.state.isValueDisabled('x')).toBe(true);
    expect(result.current.state.isValueDisabled('y')).toBe(true);
    expect(result.current.state.isValueDisabled('z')).toBe(false);
  });

  test('isValueDisabled returns true for every value when tablist isDisabled', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ isDisabled: true }, ref);
    });

    expect(result.current.state.isValueDisabled('anything')).toBe(true);
  });

  test('setFocusedKey updates state.focusedKey', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({}, ref);
    });

    act(() => {
      result.current.state.setFocusedKey('k1');
    });

    expect(result.current.state.focusedKey).toBe('k1');
  });

  test('elementType honors `as` shorthand', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ as: 'nav' }, ref);
    });
    expect(result.current.elementType).toBe('nav');
  });

  test('tabListProps forwards aria-label', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLElement>(null);
      return useTabList({ 'aria-label': 'My tabs' } as any, ref);
    });
    expect(result.current.tabListProps['aria-label']).toBe('My tabs');
  });
});
