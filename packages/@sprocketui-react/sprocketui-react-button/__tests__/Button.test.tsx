import '@testing-library/jest-dom';
import { Button } from '@sprocketui-react/button';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('Sprocket UI - Button', () => {
  test('render button with default states', () => {
    render(<Button>Default Button</Button>);

    const button: HTMLElement = screen.getByText('Default Button');
    expect(button).toHaveRole('button');
    expect(button).toHaveAttribute('data-sprocket-state');
    expect(button).toHaveClass(':sprocket:=button');
    expect(button).toHaveAttribute('id', 'necto-«r0»');
  });

  test('render children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeDefined();
  });

  test('has role="button"', () => {
    render(<Button>Role Test</Button>);
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('forward props to the button and merges className/style', () => {
    render(
      <Button id="custom-id" className="extra-class" style={{ color: 'red' }}>
        Styled Button
      </Button>
    );

    const button: HTMLElement = screen.getByText('Styled Button');
    expect(button).toHaveAttribute('id', 'custom-id');
    expect(button.className).toContain('extra-class');
    expect(button).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('renders as disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>);

    const button: HTMLElement = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveAttribute('data-disabled', 'true');
    expect(button.getAttribute('data-sprocket-state')).toMatch(/\bdisabled\b/);
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button isDisabled onClick={handleClick}>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('sets data-sprocket-state to pressed when mouse is down', () => {
    render(<Button>Press Me</Button>);
    const button: HTMLElement = screen.getByText('Press Me');
    fireEvent.mouseDown(button);
    expect(button.getAttribute('data-sprocket-state')).toMatch(/\bpressed\b/);
    fireEvent.mouseUp(button);
    expect(button.getAttribute('data-sprocket-state')).not.toMatch(
      /\bpressed\b/
    );
  });

  test('sets data-sprocket-state to hover when mouse is over', () => {
    render(<Button>Hover Me</Button>);
    const button: HTMLElement = screen.getByText('Hover Me');
    fireEvent.mouseOver(button);
    expect(button.getAttribute('data-sprocket-state')).toMatch(/\bhover\b/);
    fireEvent.mouseOut(button);
    expect(button.getAttribute('data-sprocket-state')).not.toMatch(/\bhover\b/);
  });

  test('sets data-sprocket-state to focusVisible when focused via keyboard', async () => {
    render(<Button>Focus Visible</Button>);
    const button = screen.getByText('Focus Visible');

    await act(async () => {
      button.focus();
    });

    expect(button).toHaveFocus();
    const state = button.getAttribute('data-sprocket-state') ?? '';
    expect(state).toMatch('focus focus-visible');
  });
});
