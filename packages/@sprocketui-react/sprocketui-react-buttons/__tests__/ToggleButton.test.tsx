import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { ToggleButton } from '@sprocketui-react/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Sprocket UI - ToggleButton', () => {
  test('renders with default (unselected) state', () => {
    render(<ToggleButton>Toggle Me</ToggleButton>);

    const button = screen.getByRole('button', { name: 'Toggle Me' });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveAttribute('data-selected');
  });

  test('respects defaultSelected', () => {
    render(<ToggleButton defaultSelected>Starts Selected</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Starts Selected' });

    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-selected', 'true');
  });

  test('controlled mode: isSelected prop is reflected in the DOM', () => {
    const { rerender } = render(<ToggleButton isSelected={false}>Controlled</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Controlled' });

    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(<ToggleButton isSelected={true}>Controlled</ToggleButton>);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-selected', 'true');
  });

  test('renders as disabled when isDisabled is true', () => {
    render(<ToggleButton isDisabled>Disabled</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Disabled' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('forwards id, className, and children', () => {
    render(
      <ToggleButton id="my-toggle" className="extra">
        Styled Toggle
      </ToggleButton>
    );
    const button = screen.getByRole('button', { name: 'Styled Toggle' });

    expect(button).toHaveAttribute('id', 'my-toggle');
    expect(button.className).toContain('extra');
  });

  // Interactive behavior — uncontrolled mode flips state on click.
  test('toggles selected state on click (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(<ToggleButton>Toggle</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Toggle' });

    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-selected', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveAttribute('data-selected');
  });

  test('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<ToggleButton isDisabled>Disabled Toggle</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Disabled Toggle' });

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('toggles when activated via Space key', async () => {
    const user = userEvent.setup();
    render(<ToggleButton>Space Toggle</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Space Toggle' });

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard(' ');
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.keyboard(' ');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('toggles when activated via Enter key', async () => {
    const user = userEvent.setup();
    render(<ToggleButton>Enter Toggle</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Enter Toggle' });

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('fires onClick handler on user click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ToggleButton onClick={onClick}>Clicker</ToggleButton>);

    await user.click(screen.getByRole('button', { name: 'Clicker' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
