import { useRef } from 'react';
import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useButton } from '@sprocketui-react/button';

describe('Sprocket UI - useButton', () => {
  test('returns correct default props and state for a button', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useButton({ children: 'Test' }, ref));

    expect(result.current.isDisabled).toBe(false);
    expect(result.current.isPressed).toBe(false);
    expect(result.current.isHovered).toBe(false);
    expect(result.current.isFocused).toBe(false);
    expect(result.current.isFocusVisible).toBe(false);
    expect(result.current.elementType).toBe('button');
    expect(result.current.buttonProps.type).toBe('button');
    expect(result.current.buttonProps.disabled).toBe(false);
  });

  test('returns correct props when isDisabled is true', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useButton({ isDisabled: true }, ref));

    expect(result.current.isDisabled).toBe(true);
    expect(result.current.buttonProps.disabled).toBe(true);
  });

  test('returns correct props for anchor element', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useButton({ elementType: 'a', href: 'https://example.com' }, ref)
    );

    expect(result.current.elementType).toBe('a');
    expect(result.current.buttonProps.role).toBe('button');
    expect(result.current.buttonProps.href).toBe('https://example.com');
  });
});
