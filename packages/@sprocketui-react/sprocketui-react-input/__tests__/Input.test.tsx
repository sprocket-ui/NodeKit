/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom';
import { createRef, useState } from 'react';
import { Input, InputContext } from '@sprocketui-react/input';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - Input', () => {
  test('render input with default states', () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toBeInstanceOf(HTMLInputElement);
    // `data-sprocket-state` is always rendered; empty when no states are active.
    expect(input.getAttribute('data-sprocket-state')).toBe('');
    expect(input.className).toContain('sprocket');
    expect(input.className).toContain('input');
    expect(input.getAttribute('id')).toMatch(/^necto-/);
  });

  test('renders with auto-generated id when none provided', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input').getAttribute('id')).toMatch(/^necto-/);
  });

  test('uses provided id when supplied', () => {
    render(<Input data-testid="input" id="custom-id" />);
    expect(screen.getByTestId('input')).toHaveAttribute('id', 'custom-id');
  });

  test('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('forwards standard props (placeholder, type, name)', () => {
    render(
      <Input
        data-testid="input"
        placeholder="Enter text"
        type="email"
        name="email-field"
      />
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email-field');
  });

  test('merges className and style', () => {
    render(
      <Input
        data-testid="input"
        className="extra-class"
        style={{ color: 'red' }}
      />
    );

    const input = screen.getByTestId('input');
    expect(input.className).toContain('extra-class');
    expect(input.className).toContain('sprocket');
    expect(input).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('renders as disabled when isDisabled is true', () => {
    render(<Input data-testid="input" isDisabled />);

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('data-disabled', 'true');
    expect(input.getAttribute('data-sprocket-state')).toMatch(/\bdisabled\b/);
  });

  test('renders as readonly when isReadOnly is true', () => {
    render(<Input data-testid="input" isReadOnly />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('data-readonly', 'true');
    expect(input.getAttribute('data-sprocket-state')).toMatch(/\breadonly\b/);
  });

  test('renders as required when isRequired is true', () => {
    render(<Input data-testid="input" isRequired />);

    const input = screen.getByTestId('input');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('data-required', 'true');
    expect(input.getAttribute('data-sprocket-state')).toMatch(/\brequired\b/);
  });

  test('renders as invalid when aria-invalid is true', () => {
    render(<Input data-testid="input" aria-invalid />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('data-invalid', 'true');
    expect(input.getAttribute('data-sprocket-state')).toMatch(/\binvalid\b/);
  });

  test('is not invalid when aria-invalid="false"', () => {
    render(<Input data-testid="input" aria-invalid="false" />);
    const input = screen.getByTestId('input');
    expect(input).not.toHaveAttribute('data-invalid');
  });

  test('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input data-testid="input" onChange={handleChange} />);
    await user.type(screen.getByTestId('input'), 'abc');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  test('calls onValueChange with the string value when user types', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(<Input data-testid="input" onValueChange={handleValueChange} />);
    await user.type(screen.getByTestId('input'), 'hi');

    expect(handleValueChange).toHaveBeenNthCalledWith(1, 'h');
    expect(handleValueChange).toHaveBeenNthCalledWith(2, 'hi');
  });

  test('does not fire change events when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input data-testid="input" isDisabled onChange={handleChange} />);
    await user.type(screen.getByTestId('input'), 'abc');

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('supports controlled value', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    function Controlled() {
      const [value, setValue] = useState('init');
      return (
        <Input
          data-testid="input"
          value={value}
          onValueChange={(v) => {
            setValue(v);
            handleValueChange(v);
          }}
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('init');

    await user.clear(input);
    await user.type(input, 'new');
    expect(input.value).toBe('new');
    expect(handleValueChange).toHaveBeenLastCalledWith('new');
  });

  test('supports uncontrolled value with defaultValue', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" defaultValue="seed" />);

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('seed');

    await user.clear(input);
    await user.type(input, 'x');
    expect(input.value).toBe('x');
  });

  test('calls onFocus and onBlur', async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(
      <>
        <Input data-testid="input" onFocus={onFocus} onBlur={onBlur} />
        <button type="button">blur target</button>
      </>
    );

    await user.tab();
    // Focus plumbing flows through useFocusable + useFocusRing — fire count
    // is an implementation detail. We only care that it fired.
    expect(onFocus).toHaveBeenCalled();
    expect(screen.getByTestId('input')).toHaveFocus();

    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  test('sets data-focus-visible when focused via keyboard', async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);

    await user.tab();

    const input = screen.getByTestId('input');
    expect(input).toHaveFocus();
    expect(input.getAttribute('data-sprocket-state') ?? '').toMatch(/focus-visible/);
  });

  test('clearable exposes clear behavior via programmatic change', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onValueChange = vi.fn();

    render(
      <Input
        data-testid="input"
        clearable
        defaultValue="seed"
        onClear={onClear}
        onValueChange={onValueChange}
      />
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe('seed');

    await user.clear(input);
    expect(input.value).toBe('');
  });

  test('renders with custom elementType="textarea"', () => {
    render(<Input data-testid="input" as="textarea" />);
    expect(screen.getByTestId('input')).toBeInstanceOf(HTMLTextAreaElement);
  });

  test('non-native elementType receives role="textbox"', () => {
    render(<Input data-testid="input" as="div" />);
    const el = screen.getByTestId('input');
    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el).toHaveAttribute('role', 'textbox');
  });

  test('inherits props from InputContext', () => {
    render(
      <InputContext.Provider value={{ isDisabled: true, isRequired: true }}>
        <Input data-testid="input" />
      </InputContext.Provider>
    );

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('data-disabled', 'true');
    expect(input).toHaveAttribute('data-required', 'true');
  });

  test('local props override context props', () => {
    render(
      <InputContext.Provider value={{ isDisabled: true }}>
        <Input data-testid="input" isDisabled={false} />
      </InputContext.Provider>
    );

    expect(screen.getByTestId('input')).not.toBeDisabled();
  });

  test('Input.Root is an alias for Input', () => {
    expect(Input.Root).toBeDefined();
    render(<Input.Root data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInstanceOf(HTMLInputElement);
  });

  test('displayName is set to Input', () => {
    expect(Input.displayName).toBe('Input');
  });
});
