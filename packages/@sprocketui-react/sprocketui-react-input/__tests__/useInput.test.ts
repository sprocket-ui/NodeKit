/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useInput } from '@sprocketui-react/input';

describe('Sprocket UI - useInput', () => {
  test('returns correct default props and state', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({}, ref));

    expect(result.current.isDisabled).toBe(false);
    expect(result.current.isReadOnly).toBe(false);
    expect(result.current.isRequired).toBe(false);
    expect(result.current.isInvalid).toBe(false);
    expect(result.current.isFocused).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.isFocusVisible).toBe(false);
    expect(result.current.elementType).toBe('input');

    expect(result.current.inputProps.disabled).toBe(false);
    expect(result.current.inputProps.readOnly).toBe(false);
    expect(result.current.inputProps.required).toBe(false);
    expect(result.current.inputProps.value).toBe('');
  });

  test('returns disabled state when isDisabled is true', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ isDisabled: true }, ref));

    expect(result.current.isDisabled).toBe(true);
    expect(result.current.inputProps.disabled).toBe(true);
    expect(result.current.inputProps['aria-disabled']).toBe(true);
  });

  test('returns readOnly state when isReadOnly is true', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ isReadOnly: true }, ref));

    expect(result.current.isReadOnly).toBe(true);
    expect(result.current.inputProps.readOnly).toBe(true);
    expect(result.current.inputProps['aria-readonly']).toBe(true);
  });

  test('returns required state when isRequired is true', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ isRequired: true }, ref));

    expect(result.current.isRequired).toBe(true);
    expect(result.current.inputProps.required).toBe(true);
    expect(result.current.inputProps['aria-required']).toBe(true);
  });

  test('marks invalid when aria-invalid is passed', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ 'aria-invalid': true }, ref));

    expect(result.current.isInvalid).toBe(true);
  });

  test('does not mark invalid when aria-invalid="false"', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ 'aria-invalid': 'false' }, ref));

    expect(result.current.isInvalid).toBe(false);
  });

  test('defaults elementType to input', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({}, ref));
    expect(result.current.elementType).toBe('input');
  });

  test('honors explicit elementType="textarea"', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useInput({ elementType: 'textarea' as const }, ref)
    );
    expect(result.current.elementType).toBe('textarea');
  });

  test('falls back to "as" alias when elementType is missing', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ as: 'textarea' as const }, ref));
    expect(result.current.elementType).toBe('textarea');
  });

  test('adds role="textbox" for non-native elements', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ as: 'div' as const }, ref));

    expect(result.current.elementType).toBe('div');
    expect(result.current.inputProps.role).toBe('textbox');
  });

  test('does not add role for native input', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({}, ref));
    expect(result.current.inputProps.role).toBeUndefined();
  });

  test('initializes value from defaultValue (uncontrolled)', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ defaultValue: 'seed' }, ref));
    expect(result.current.inputProps.value).toBe('seed');
  });

  test('initializes value from controlled value prop', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ value: 'forced' }, ref));
    expect(result.current.inputProps.value).toBe('forced');
  });

  test('fires onChange and onValueChange when value changes (uncontrolled)', () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    const ref = { current: null };

    const { result } = renderHook(() =>
      useInput({ onChange, onValueChange }, ref)
    );

    act(() => {
      result.current.inputProps.onChange?.({
        target: { value: 'hello' }
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('hello');
  });

  test('does not internally mutate state when controlled (calls onValueChange only)', () => {
    const onValueChange = vi.fn();
    const ref = { current: null };

    const { result } = renderHook(() =>
      useInput({ value: 'fixed', onValueChange }, ref)
    );

    act(() => {
      result.current.inputProps.onChange?.({
        target: { value: 'attempt' }
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    // Value prop stays authoritative — consumer owns the state.
    expect(result.current.inputProps.value).toBe('fixed');
    expect(onValueChange).toHaveBeenCalledWith('attempt');
  });

  test('does not expose clearInput when clearable is falsy', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({}, ref));
    expect(result.current.clearInput).toBeUndefined();
  });

  test('exposes clearInput when clearable is true', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({ clearable: true }, ref));
    expect(typeof result.current.clearInput).toBe('function');
  });

  test('clearInput resets value, fires onClear and onValueChange, dispatches input event', () => {
    const input = document.createElement('input');
    input.value = 'something';
    const ref = { current: input };

    const onClear = vi.fn();
    const onValueChange = vi.fn();
    const listener = vi.fn();
    input.addEventListener('input', listener);

    const { result } = renderHook(() =>
      useInput(
        { clearable: true, defaultValue: 'something', onClear, onValueChange },
        ref
      )
    );

    act(() => {
      result.current.clearInput?.();
    });

    expect(input.value).toBe('');
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith('');
    expect(listener).toHaveBeenCalled();
  });

  test('clearInput is a no-op when ref is null', () => {
    const onClear = vi.fn();
    const ref: { current: HTMLInputElement | null } = { current: null };
    const { result } = renderHook(() =>
      useInput({ clearable: true, onClear }, ref)
    );

    act(() => {
      result.current.clearInput?.();
    });

    // Without a ref element, clear bails early — no callbacks fire.
    expect(onClear).not.toHaveBeenCalled();
  });

  test('merges focus, hover, and focusable props onto inputProps', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useInput({}, ref));

    // Sampled handlers from the three underlying necto-react/hooks utilities.
    expect(typeof result.current.inputProps.onFocus).toBe('function');
    expect(typeof result.current.inputProps.onBlur).toBe('function');
    expect(typeof result.current.inputProps.onPointerEnter).toBe('function');
    expect(typeof result.current.inputProps.onPointerLeave).toBe('function');
  });

  test('filters non-DOM props and forwards allowed externals (id, name, value, form)', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useInput(
        {
          id: 'my-id',
          name: 'my-name',
          form: 'my-form',
          // Non-DOM helper — must not leak through.
          clearable: true
        } as any,
        ref
      )
    );

    expect(result.current.inputProps.id).toBe('my-id');
    expect(result.current.inputProps.name).toBe('my-name');
    expect(result.current.inputProps.form).toBe('my-form');
    expect('clearable' in result.current.inputProps).toBe(false);
  });
});
