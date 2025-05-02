import React from 'react';
import { Button } from '../src/index';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-sprocket-state', '');
  });

  it('applies data-disabled attribute when isDisabled is true', () => {
    render(<Button isDisabled>Test Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('data-disabled', 'true');
    expect(button).toHaveAttribute('data-sprocket-state', 'disabled');
  });

  it('applies data-hover attribute on mouse events', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    expect(button).toHaveAttribute('data-hover', 'true');
    expect(button).toHaveAttribute('data-sprocket-state', 'hover');

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveAttribute('data-hover');
    expect(button).toHaveAttribute('data-sprocket-state', '');
  });

  it('applies data-pressed attribute on click', async () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');

    await userEvent.click(button);
    expect(button).toHaveAttribute('data-pressed', 'true');
  });

  it('applies data-focus and data-focus-visible attributes on focus', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');

    fireEvent.focus(button);
    expect(button).toHaveAttribute('data-focus', 'true');
    expect(button).toHaveAttribute('data-focus-visible', 'true');

    fireEvent.blur(button);
    expect(button).not.toHaveAttribute('data-focus');
    expect(button).not.toHaveAttribute('data-focus-visible');
  });

  it('passes slot prop correctly', () => {
    render(<Button slot="test-slot">Test Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('slot', 'test-slot');
  });
});