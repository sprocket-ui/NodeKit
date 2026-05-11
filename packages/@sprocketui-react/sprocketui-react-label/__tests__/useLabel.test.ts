/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLabel } from '@sprocketui-react/label';

describe('Sprocket UI - useLabel', () => {
  test('returns correct default props and elementType', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({}, ref));

    expect(result.current.elementType).toBe('label');
    expect(typeof result.current.labelProps.id).toBe('string');
    expect(result.current.labelProps.id).toMatch(/^necto-/);
    expect(typeof result.current.labelProps.onMouseDown).toBe('function');
  });

  test('honors a provided id', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ id: 'my-label-id' }, ref)
    );

    expect(result.current.labelProps.id).toBe('my-label-id');
  });

  test('forwards htmlFor when elementType is "label"', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ htmlFor: 'email-input' }, ref)
    );

    expect(result.current.labelProps.htmlFor).toBe('email-input');
  });

  test('does NOT forward htmlFor when elementType is non-label', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ htmlFor: 'email-input', elementType: 'span' as const }, ref)
    );

    expect(result.current.labelProps.htmlFor).toBeUndefined();
    expect(result.current.elementType).toBe('span');
  });

  test('falls back to "as" alias when elementType is missing', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ as: 'div' as const }, ref)
    );
    expect(result.current.elementType).toBe('div');
  });

  test('returns aria-labelledby in fieldProps when htmlFor is set', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ htmlFor: 'email-input', id: 'lbl' }, ref)
    );

    expect(result.current.fieldProps['aria-labelledby']).toBe('lbl');
  });

  test('returns empty fieldProps when htmlFor is absent', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({ id: 'lbl' }, ref));

    expect(result.current.fieldProps).toEqual({});
  });

  test('onMouseDown invokes user callback for normal targets', () => {
    const onMouseDown = vi.fn();
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({ onMouseDown }, ref));

    const event = {
      target: document.createElement('span'),
      detail: 1,
      defaultPrevented: false,
      preventDefault: vi.fn()
    } as any;

    result.current.labelProps.onMouseDown(event);

    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  test('onMouseDown bails out when click target is a button/input/select/textarea', () => {
    const onMouseDown = vi.fn();
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({ onMouseDown }, ref));

    for (const tag of ['button', 'input', 'select', 'textarea']) {
      const target = document.createElement(tag);
      const event = {
        target,
        detail: 1,
        defaultPrevented: false,
        preventDefault: vi.fn()
      } as any;
      result.current.labelProps.onMouseDown(event);
    }

    expect(onMouseDown).not.toHaveBeenCalled();
  });

  test('onMouseDown calls preventDefault on double-click to suppress text selection', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({}, ref));

    const event = {
      target: document.createElement('span'),
      detail: 2, // double-click
      defaultPrevented: false,
      preventDefault: vi.fn()
    } as any;

    result.current.labelProps.onMouseDown(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  test('onMouseDown does not call preventDefault when consumer already prevented it', () => {
    const onMouseDown = vi.fn((e: any) => {
      e.defaultPrevented = true;
    });
    const ref = { current: null };
    const { result } = renderHook(() => useLabel({ onMouseDown }, ref));

    const event = {
      target: document.createElement('span'),
      detail: 2,
      defaultPrevented: false,
      preventDefault: vi.fn()
    } as any;

    result.current.labelProps.onMouseDown(event);

    // User callback ran and flipped defaultPrevented; we should not call it again.
    expect(onMouseDown).toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  test('forwards id and data-* through filterDOMProps', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useLabel({ id: 'custom', 'data-testid': 'my-label' } as any, ref)
    );

    expect(result.current.labelProps.id).toBe('custom');
    expect(result.current.labelProps['data-testid']).toBe('my-label');
  });
});
