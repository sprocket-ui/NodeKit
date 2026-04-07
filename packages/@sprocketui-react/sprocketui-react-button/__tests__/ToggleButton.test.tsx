import '@testing-library/jest-dom';
import { ToggleButton } from '@sprocketui-react/button';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - ToggleButton', () => {
	test('renders with default (unselected) state', () => {
		render(<ToggleButton>Toggle Me</ToggleButton>);

		const button: HTMLElement = screen.getByText('Toggle Me');
		expect(button).toHaveRole('button');
		expect(button).toBeInstanceOf(HTMLButtonElement);
		expect(button).toHaveAttribute('aria-pressed', 'false');
		expect(button).not.toHaveAttribute('data-selected');
	});

	test('respects defaultSelected', () => {
		render(<ToggleButton defaultSelected>Starts Selected</ToggleButton>);
		const button: HTMLElement = screen.getByText('Starts Selected');

		expect(button).toHaveAttribute('aria-pressed', 'true');
		expect(button).toHaveAttribute('data-selected', 'true');
	});

	test('controlled mode: isSelected prop is reflected in the DOM', () => {
		const { rerender } = render(<ToggleButton isSelected={false}>Controlled</ToggleButton>);
		const button: HTMLElement = screen.getByText('Controlled');

		expect(button).toHaveAttribute('aria-pressed', 'false');

		rerender(<ToggleButton isSelected={true}>Controlled</ToggleButton>);
		expect(button).toHaveAttribute('aria-pressed', 'true');
		expect(button).toHaveAttribute('data-selected', 'true');
	});

	test('renders as disabled when isDisabled is true', () => {
		render(<ToggleButton isDisabled>Disabled</ToggleButton>);
		const button: HTMLElement = screen.getByText('Disabled');

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('aria-pressed', 'false');
	});

	test('forwards id, className, and children', () => {
		render(
			<ToggleButton id="my-toggle" className="extra">
				Styled Toggle
			</ToggleButton>
		);
		const button: HTMLElement = screen.getByText('Styled Toggle');

		expect(button).toHaveAttribute('id', 'my-toggle');
		expect(button.className).toContain('extra');
	});
});
