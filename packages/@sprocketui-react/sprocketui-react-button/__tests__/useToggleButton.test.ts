import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToggleButton } from '@sprocketui-react/button';

describe('Sprocket UI - useToggleButton', () => {
	test('returns unselected state by default', () => {
		const ref = { current: null };
		const { result } = renderHook(() => useToggleButton({ children: 'Test' }, ref));

		expect(result.current.isSelected).toBe(false);
		expect(result.current.buttonProps['aria-pressed']).toBe(false);
		expect(result.current.elementType).toBe('button');
	});

	test('respects defaultSelected (uncontrolled)', () => {
		const ref = { current: null };
		const { result } = renderHook(() => useToggleButton({ defaultSelected: true }, ref));

		expect(result.current.isSelected).toBe(true);
		expect(result.current.buttonProps['aria-pressed']).toBe(true);
		expect(result.current.buttonProps['data-selected']).toBe('true');
	});

	test('controlled mode: isSelected prop is reflected in return value', () => {
		const ref = { current: null };
		const { result, rerender } = renderHook(
			({ selected }: { selected: boolean }) => useToggleButton({ isSelected: selected }, ref),
			{ initialProps: { selected: false } }
		);

		expect(result.current.isSelected).toBe(false);
		expect(result.current.buttonProps['aria-pressed']).toBe(false);

		rerender({ selected: true });
		expect(result.current.isSelected).toBe(true);
		expect(result.current.buttonProps['aria-pressed']).toBe(true);
		expect(result.current.buttonProps['data-selected']).toBe('true');
	});

	test('disabled state propagates from useButton', () => {
		const ref = { current: null };
		const { result } = renderHook(() => useToggleButton({ isDisabled: true }, ref));

		expect(result.current.isDisabled).toBe(true);
		expect(result.current.buttonProps.disabled).toBe(true);
	});

	test('exposes aria-pressed on buttonProps', () => {
		const ref = { current: null };
		const { result } = renderHook(() => useToggleButton({}, ref));
		expect(result.current.buttonProps).toHaveProperty('aria-pressed');
	});
});
