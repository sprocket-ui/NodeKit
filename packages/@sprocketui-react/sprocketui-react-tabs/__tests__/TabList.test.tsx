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
import { render, screen } from '@testing-library/react';

describe('Sprocket UI - TabList', () => {
  test('renders with role="tablist"', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="test">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  test('forwards aria-label', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="Navigation tabs">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Navigation tabs');
  });

  test('forwards aria-labelledby', () => {
    render(
      <>
        <span id="tabs-heading">My Tabs</span>
        <Tabs defaultSelectedValue="a">
          <Tabs.List aria-labelledby="tabs-heading">
            <Tabs.Tab value="a">A</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-labelledby', 'tabs-heading');
  });

  test('exposes orientation via aria-orientation', () => {
    const { rerender } = render(
      <Tabs defaultSelectedValue="a" orientation="horizontal">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');

    rerender(
      <Tabs defaultSelectedValue="a" orientation="vertical">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('applies user-provided className alongside default', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t" className="my-custom-list">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    expect(screen.getByRole('tablist').className).toContain('my-custom-list');
  });

  test('renders children inside the tablist', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
          <Tabs.Tab value="c">C</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    const list = screen.getByRole('tablist');
    expect(list.querySelectorAll('[role="tab"]')).toHaveLength(3);
  });

  test('arrow navigation is scoped to tabs in this list', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );

    await user.click(screen.getByRole('tab', { name: 'A' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
  });
});
