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

describe('Sprocket UI - TabPanel', () => {
  test('renders with role="tabpanel" when selected', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Panel A</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Panel A')).toBeInTheDocument();
  });

  test('is not mounted when not selected (default behavior)', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Panel A</Tabs.Panel>
          <Tabs.Panel value="b">Panel B</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
  });

  test('mounts but hides when forceMount + not selected', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Panel A</Tabs.Panel>
          <Tabs.Panel value="b" forceMount>
            Panel B
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    const panelB = screen.getByText('Panel B');
    expect(panelB).toBeInTheDocument();
    expect(panelB).toHaveAttribute('hidden');
  });

  test('has aria-labelledby pointing to its matching tab', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">Tab A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Content</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    const panel = screen.getByRole('tabpanel');
    const tab = screen.getByRole('tab', { name: 'Tab A' });
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  test('sets data-selected=true when selected', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Content</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel')).toHaveAttribute('data-selected', 'true');
  });

  test('has tabIndex=0 so it can receive focus for screen readers', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Content</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel')).toHaveAttribute('tabindex', '0');
  });

  test('renders different element via as prop', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a" as="section">
            Content
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel').tagName).toBe('SECTION');
  });

  test('forwards user className', () => {
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a" className="custom-panel">
            Content
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel').className).toContain('custom-panel');
  });

  test('swaps visible panel when tab changes', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultSelectedValue="a">
        <Tabs.List aria-label="t">
          <Tabs.Tab value="a">A</Tabs.Tab>
          <Tabs.Tab value="b">B</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="a">Panel A</Tabs.Panel>
          <Tabs.Panel value="b">Panel B</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'B' }));

    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
    expect(screen.getByText('Panel B')).toBeInTheDocument();
  });
});
