/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom';
import { createRef } from 'react';
import { Label, LabelContext } from '@sprocketui-react/label';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - Label', () => {
  test('renders a <label> by default', () => {
    render(<Label>Email</Label>);

    const label = screen.getByText('Email');
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label.className).toContain('sprocket');
    expect(label.className).toContain('label');
  });

  test('auto-generates an id when none is supplied', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email').getAttribute('id')).toMatch(/^necto-/);
  });

  test('uses the provided id when supplied', () => {
    render(<Label id="email-label">Email</Label>);
    expect(screen.getByText('Email')).toHaveAttribute('id', 'email-label');
  });

  test('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Email</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('forwards htmlFor when rendering as a label', () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input');
  });

  test('does NOT forward htmlFor when rendered as a non-label element', () => {
    render(
      <Label as="span" htmlFor="email-input">
        Email
      </Label>
    );
    const span = screen.getByText('Email');
    expect(span).toBeInstanceOf(HTMLSpanElement);
    expect(span).not.toHaveAttribute('for');
  });

  test('renders children', () => {
    render(<Label>Display name</Label>);
    expect(screen.getByText('Display name')).toBeInTheDocument();
  });

  test('merges className and style with defaults', () => {
    render(
      <Label className="extra-class" style={{ color: 'red' }}>
        Email
      </Label>
    );
    const label = screen.getByText('Email');
    expect(label.className).toContain('extra-class');
    expect(label.className).toContain('sprocket');
    expect(label).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('renders as a custom elementType via "as"', () => {
    render(<Label as="div">Email</Label>);
    expect(screen.getByText('Email')).toBeInstanceOf(HTMLDivElement);
  });

  test('calls onMouseDown when label is clicked', async () => {
    const user = userEvent.setup();
    const onMouseDown = vi.fn();

    render(<Label onMouseDown={onMouseDown}>Click me</Label>);
    await user.pointer([{ keys: '[MouseLeft>]', target: screen.getByText('Click me') }]);
    await user.pointer({ keys: '[/MouseLeft]' });

    expect(onMouseDown).toHaveBeenCalled();
  });

  test('does NOT call onMouseDown when target is a nested form element', async () => {
    const user = userEvent.setup();
    const onMouseDown = vi.fn();

    render(
      <Label onMouseDown={onMouseDown}>
        Email
        <input type="text" data-testid="nested-input" />
      </Label>
    );

    await user.pointer([
      { keys: '[MouseLeft>]', target: screen.getByTestId('nested-input') }
    ]);
    await user.pointer({ keys: '[/MouseLeft]' });

    expect(onMouseDown).not.toHaveBeenCalled();
  });

  test('inherits props from LabelContext', () => {
    render(
      <LabelContext.Provider value={{ htmlFor: 'ctx-input' }}>
        <Label>Email</Label>
      </LabelContext.Provider>
    );
    expect(screen.getByText('Email')).toHaveAttribute('for', 'ctx-input');
  });

  test('local props override context props', () => {
    render(
      <LabelContext.Provider value={{ htmlFor: 'ctx-input' }}>
        <Label htmlFor="local-input">Email</Label>
      </LabelContext.Provider>
    );
    expect(screen.getByText('Email')).toHaveAttribute('for', 'local-input');
  });

  test('Label.Root is an alias for Label', () => {
    expect(Label.Root).toBeDefined();
    render(<Label.Root>Root label</Label.Root>);
    expect(screen.getByText('Root label')).toBeInstanceOf(HTMLLabelElement);
  });

  test('displayName is set to Label', () => {
    expect(Label.displayName).toBe('Label');
  });
});
