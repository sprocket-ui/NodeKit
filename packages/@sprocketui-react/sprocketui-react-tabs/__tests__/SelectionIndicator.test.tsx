/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom';
import { Tabs } from '@sprocketui-react/tabs';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

describe('Sprocket UI - SelectionIndicator', () => {
  test('renders inside TabList', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByTestId('indicator')).toBeInTheDocument();
  });

  test('is aria-hidden (purely visual)', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByTestId('indicator')).toHaveAttribute('aria-hidden', 'true');
  });

  test('has data-selected when a tab is selected', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByTestId('indicator')).toHaveAttribute('data-selected', 'true');
  });

  test('does not have data-selected when no tab is selected', () => {
    render(
      <Tabs>
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByTestId('indicator')).not.toHaveAttribute('data-selected');
  });

  test('sets CSS custom properties for position/size once measured', async () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t" style={{ width: 300 }}>
          <Tabs.Tab value="a" style={{ width: 100, height: 40 }}>
            A
          </Tabs.Tab>
          <Tabs.Tab value="b" style={{ width: 100, height: 40 }}>
            B
          </Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );

    const indicator = screen.getByTestId('indicator') as HTMLElement;
    // Hook measures via useLayoutEffect + ResizeObserver; values land async in browser mode.
    await waitFor(() => {
      expect(indicator.style.getPropertyValue('--sprocketui-selection-indicator-width')).toBeTruthy();
      expect(indicator.style.getPropertyValue('--sprocketui-selection-indicator-height')).toBeTruthy();
    });
  });

  test('updates CSS vars when selection changes', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a" style={{ width: 50 }}>
            A
          </Tabs.Tab>
          <Tabs.Tab value="b" style={{ width: 150 }}>
            B
          </Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" />
        </Tabs.List>
      </Tabs>
    );

    const indicator = screen.getByTestId('indicator') as HTMLElement;
    let widthBefore = '';
    await waitFor(() => {
      widthBefore = indicator.style.getPropertyValue('--sprocketui-selection-indicator-width');
      expect(widthBefore).toBeTruthy();
    });

    await user.click(screen.getByRole('tab', { name: 'B' }));

    await waitFor(() => {
      const widthAfter = indicator.style.getPropertyValue('--sprocketui-selection-indicator-width');
      expect(widthAfter).toBeTruthy();
      expect(widthAfter).not.toBe(widthBefore);
    });
  });

  test('forwards user className', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Indicator data-testid="indicator" className="my-indicator" />
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByTestId('indicator').className).toContain('my-indicator');
  });

  test('throws when rendered outside TabList', () => {
    const originalError = console.error;
    console.error = () => {};
    try {
      expect(() => render(<Tabs.Indicator />)).toThrow();
    } finally {
      console.error = originalError;
    }
  });
});
