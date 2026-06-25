/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom';
import { Tabs } from '@sprocketui-react/tabs';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - TabPanels', () => {
  test('renders as a wrapping container for Panel children', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels data-testid="panels">
          <Tabs.Panel value="a">Content A</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    const panels = screen.getByTestId('panels');
    expect(panels).toBeInTheDocument();
    expect(panels).toContainElement(screen.getByRole('tabpanel'));
  });

  test('forwards className', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels data-testid="panels" className="my-panels">
          <Tabs.Panel value="a">C</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByTestId('panels').className).toContain('my-panels');
  });

  test('accepts custom elementType via as prop', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels data-testid="panels" as="section">
          <Tabs.Panel value="a">C</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByTestId('panels').tagName).toBe('SECTION');
  });

  test('throws when rendered outside a Tabs component', () => {
    const originalError = console.error;
    console.error = () => {};
    try {
      expect(() =>
        render(
          <Tabs.Panels>
            <Tabs.Panel value="a">C</Tabs.Panel>
          </Tabs.Panels>
        )
      ).toThrow();
    } finally {
      console.error = originalError;
    }
  });
});
