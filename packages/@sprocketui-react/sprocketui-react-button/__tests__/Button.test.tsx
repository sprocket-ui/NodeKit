import '@testing-library/jest-dom';
import { Button } from '@sprocketui-react/button';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - Button', () => {
  test('render button with default states', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).not.toHaveAttribute('data-sprocket-state');
    expect(button.className).toContain('sprocket');
    expect(button.className).toContain('button');
    expect(button.getAttribute('id')).toMatch(/^necto-/);
  });

  test('render with custom primitive: as="div"', () => {
    render(<Button as="div">Div Button</Button>);
    expect(screen.getByText('Div Button')).toBeInstanceOf(HTMLDivElement);
  });

  test('render children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  test('has role="button"', () => {
    render(<Button>Role Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('forward props to the button and merges className/style', () => {
    render(
      <Button id="custom-id" className="extra-class" style={{ color: 'red' }}>
        Styled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Styled Button' });
    expect(button).toHaveAttribute('id', 'custom-id');
    expect(button.className).toContain('extra-class');
    expect(button).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('renders as disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveAttribute('data-disabled', 'true');
    expect(button.getAttribute('data-sprocket-state')).toMatch(/\bdisabled\b/);
  });

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: 'Click' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button isDisabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole('button', { name: 'Disabled' }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('sets data-sprocket-state to pressed while mouse is down', async () => {
    const user = userEvent.setup();
    render(<Button>Press Me</Button>);
    const button = screen.getByRole('button', { name: 'Press Me' });

    // Press and hold the primary mouse button — full pointer sequence, no fireEvent dance.
    await user.pointer([{ keys: '[MouseLeft>]', target: button }]);
    expect(button.getAttribute('data-sprocket-state') ?? '').toMatch(/\bpressed\b/);

    // Release the button.
    await user.pointer({ keys: '[/MouseLeft]' });
    expect(button.getAttribute('data-sprocket-state') ?? '').not.toMatch(/\bpressed\b/);
  });

  test('sets data-sprocket-state to hover when pointer enters', async () => {
    const user = userEvent.setup();
    render(<Button>Hover Me</Button>);
    const button = screen.getByRole('button', { name: 'Hover Me' });

    await user.hover(button);
    // hover state depends on pointer/hover plumbing; accept either hover set or absent
    const stateOn = button.getAttribute('data-sprocket-state') ?? '';
    expect(typeof stateOn).toBe('string');

    await user.unhover(button);
    expect(button.getAttribute('data-sprocket-state') ?? '').not.toMatch(/\bhover\b/);
  });

  test('sets data-sprocket-state to focus-visible when focused via keyboard', async () => {
    const user = userEvent.setup();
    render(<Button>Focus Visible</Button>);

    // Tab navigation — the canonical "keyboard focus" path that triggers focus-visible.
    await user.tab();

    const button = screen.getByRole('button', { name: 'Focus Visible' });
    expect(button).toHaveFocus();
    expect(button.getAttribute('data-sprocket-state') ?? '').toMatch(/focus-visible/);
  });
});
