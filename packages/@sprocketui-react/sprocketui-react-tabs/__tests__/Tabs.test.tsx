/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@testing-library/jest-dom';
import { Tabs } from '@sprocketui-react/tabs';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

function renderTabsWithValues({
  defaultSelectedValue = 'one',
  selectedValue,
  onSelectionChange,
  disabledValues,
  orientation
}: {
  defaultSelectedValue?: string;
  selectedValue?: string;
  onSelectionChange?: (value: string) => void;
  disabledValues?: string[];
  orientation?: 'horizontal' | 'vertical';
} = {}) {
  return render(
    <Tabs
      defaultSelectedValue={defaultSelectedValue}
      selectedValue={selectedValue}
      onSelectionChange={onSelectionChange as any}
      disabledValues={disabledValues}
      orientation={orientation}
    >
      <Tabs.List aria-label="Sample tabs">
        <Tabs.Tab value="one">Tab One</Tabs.Tab>
        <Tabs.Tab value="two">Tab Two</Tabs.Tab>
        <Tabs.Tab value="three">Tab Three</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="one">Panel One Content</Tabs.Panel>
        <Tabs.Panel value="two">Panel Two Content</Tabs.Panel>
        <Tabs.Panel value="three">Panel Three Content</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}

describe('Sprocket UI - Tabs', () => {
  describe('structure and ARIA', () => {
    test('renders tablist, 3 tabs, and panels', () => {
      renderTabsWithValues();

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getAllByRole('tab')).toHaveLength(3);
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
    });

    test('tablist carries aria-label and aria-orientation', () => {
      renderTabsWithValues({ orientation: 'vertical' });
      const list = screen.getByRole('tablist');
      expect(list).toHaveAttribute('aria-label', 'Sample tabs');
      expect(list).toHaveAttribute('aria-orientation', 'vertical');
    });

    test('defaults to horizontal orientation', () => {
      renderTabsWithValues();
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('each tab has role="tab" and data-value', () => {
      renderTabsWithValues();
      const tabs = screen.getAllByRole('tab');
      expect(tabs[0]).toHaveAttribute('data-value', 'one');
      expect(tabs[1]).toHaveAttribute('data-value', 'two');
      expect(tabs[2]).toHaveAttribute('data-value', 'three');
    });

    test('selected tab has aria-controls pointing to its panel', () => {
      renderTabsWithValues();
      const selectedTab = screen.getByRole('tab', { name: 'Tab One' });
      const controlsId = selectedTab.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveAttribute('id', controlsId!);
    });

    test('panel has aria-labelledby pointing to its tab', () => {
      renderTabsWithValues();
      const panel = screen.getByRole('tabpanel');
      const labelledBy = panel.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();

      const selectedTab = screen.getByRole('tab', { name: 'Tab One' });
      expect(selectedTab).toHaveAttribute('id', labelledBy!);
    });
  });

  describe('uncontrolled selection', () => {
    test('defaultSelectedValue marks the matching tab selected and shows its panel', () => {
      renderTabsWithValues({ defaultSelectedValue: 'two' });

      const tabTwo = screen.getByRole('tab', { name: 'Tab Two' });
      expect(tabTwo).toHaveAttribute('data-selected', 'true');
      expect(screen.getByText('Panel Two Content')).toBeInTheDocument();
      expect(screen.queryByText('Panel One Content')).not.toBeInTheDocument();
    });

    test('clicking a tab selects it and swaps the visible panel', async () => {
      const user = userEvent.setup();
      renderTabsWithValues();

      expect(screen.getByText('Panel One Content')).toBeInTheDocument();

      await user.click(screen.getByRole('tab', { name: 'Tab Three' }));

      expect(screen.getByRole('tab', { name: 'Tab Three' })).toHaveAttribute(
        'data-selected',
        'true'
      );
      expect(screen.getByText('Panel Three Content')).toBeInTheDocument();
      expect(screen.queryByText('Panel One Content')).not.toBeInTheDocument();
    });

    test('only one tab is selected at any time', async () => {
      const user = userEvent.setup();
      renderTabsWithValues();

      await user.click(screen.getByRole('tab', { name: 'Tab Two' }));

      const selectedTabs = screen
        .getAllByRole('tab')
        .filter((t) => t.getAttribute('data-selected') === 'true');
      expect(selectedTabs).toHaveLength(1);
      expect(selectedTabs[0]).toHaveTextContent('Tab Two');
    });
  });

  describe('controlled selection', () => {
    test('selectedValue prop drives which tab is active', () => {
      renderTabsWithValues({ selectedValue: 'three' });

      expect(screen.getByRole('tab', { name: 'Tab Three' })).toHaveAttribute(
        'data-selected',
        'true'
      );
      expect(screen.getByText('Panel Three Content')).toBeInTheDocument();
    });

    test('onSelectionChange fires with the new value when user clicks', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      renderTabsWithValues({ onSelectionChange });

      await user.click(screen.getByRole('tab', { name: 'Tab Two' }));

      expect(onSelectionChange).toHaveBeenCalledWith('two');
    });

    test('DOM selection does not update if parent ignores onSelectionChange', async () => {
      const user = userEvent.setup();
      render(
        <Tabs selectedValue="one" onSelectionChange={() => {}}>
          <Tabs.List aria-label="controlled">
            <Tabs.Tab value="one">A</Tabs.Tab>
            <Tabs.Tab value="two">B</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="one">A-panel</Tabs.Panel>
            <Tabs.Panel value="two">B-panel</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'B' }));

      expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('data-selected', 'true');
      expect(screen.getByText('A-panel')).toBeInTheDocument();
      expect(screen.queryByText('B-panel')).not.toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    test('disabledValues on Tabs makes those tabs unclickable', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      renderTabsWithValues({ disabledValues: ['two'], onSelectionChange });

      const tabTwo = screen.getByRole('tab', { name: 'Tab Two' });
      expect(tabTwo).toHaveAttribute('data-disabled', 'true');

      await user.click(tabTwo);
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    test('isDisabled per-tab prop disables that tab specifically', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Tabs defaultSelectedValue="one" onSelectionChange={onSelectionChange as any}>
          <Tabs.List aria-label="per-tab disabled">
            <Tabs.Tab value="one">One</Tabs.Tab>
            <Tabs.Tab value="two" isDisabled>
              Two
            </Tabs.Tab>
            <Tabs.Tab value="three">Three</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="one">P1</Tabs.Panel>
            <Tabs.Panel value="two">P2</Tabs.Panel>
            <Tabs.Panel value="three">P3</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Two' }));
      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('data-selected', 'true');
    });

    test('isDisabled on Tabs root disables every tab', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Tabs defaultSelectedValue="one" isDisabled onSelectionChange={onSelectionChange as any}>
          <Tabs.List aria-label="all disabled">
            <Tabs.Tab value="one">1</Tabs.Tab>
            <Tabs.Tab value="two">2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="one">P1</Tabs.Panel>
            <Tabs.Panel value="two">P2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      screen.getAllByRole('tab').forEach((tab) => {
        expect(tab).toHaveAttribute('data-disabled', 'true');
      });

      await user.click(screen.getByRole('tab', { name: '2' }));
      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    test('arrow right moves focus to next tab (horizontal)', async () => {
      const user = userEvent.setup();
      renderTabsWithValues();

      await user.click(screen.getByRole('tab', { name: 'Tab One' }));
      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveFocus();
    });

    test('arrow left moves focus to previous tab (horizontal)', async () => {
      const user = userEvent.setup();
      renderTabsWithValues({ defaultSelectedValue: 'two' });

      await user.click(screen.getByRole('tab', { name: 'Tab Two' }));
      await user.keyboard('{ArrowLeft}');

      expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveFocus();
    });

    test('arrow down moves focus to next tab (vertical)', async () => {
      const user = userEvent.setup();
      renderTabsWithValues({ orientation: 'vertical' });

      await user.click(screen.getByRole('tab', { name: 'Tab One' }));
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('tab', { name: 'Tab Two' })).toHaveFocus();
    });

    test('keyboard navigation skips disabled tabs', async () => {
      const user = userEvent.setup();
      renderTabsWithValues({ disabledValues: ['two'] });

      await user.click(screen.getByRole('tab', { name: 'Tab One' }));
      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('tab', { name: 'Tab Three' })).toHaveFocus();
    });

    test('automatic activation mode selects tab on focus change', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      renderTabsWithValues({ onSelectionChange });

      await user.click(screen.getByRole('tab', { name: 'Tab One' }));
      await user.keyboard('{ArrowRight}');

      expect(onSelectionChange).toHaveBeenCalledWith('two');
    });

    test('focus wraps from last tab back to first', async () => {
      const user = userEvent.setup();
      renderTabsWithValues();

      // `user.click()` doesn't reliably focus a <div role="tab"> across browsers
      // (notably WebKit). Drive focus via keyboard navigation, which is the
      // canonical "I'm at the last tab" entry point anyway.
      await user.tab();
      await user.keyboard('{ArrowRight}{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab Three' })).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Tab One' })).toHaveFocus();
    });
  });

  describe('data-sprocket-state', () => {
    test('selected tab includes "selected" in data-sprocket-state', () => {
      renderTabsWithValues();
      const selected = screen.getByRole('tab', { name: 'Tab One' });
      expect(selected.getAttribute('data-sprocket-state') ?? '').toMatch(/\bselected\b/);
    });

    test('hover sets hover state', async () => {
      const user = userEvent.setup();
      renderTabsWithValues();
      const tab = screen.getByRole('tab', { name: 'Tab Two' });

      await user.hover(tab);
      expect(tab.getAttribute('data-hover')).toBe('true');

      await user.unhover(tab);
      expect(tab.getAttribute('data-hover')).toBeNull();
    });

    test('disabled tab has "disabled" in data-sprocket-state', () => {
      render(
        <Tabs defaultSelectedValue="one">
          <Tabs.List aria-label="t">
            <Tabs.Tab value="one">One</Tabs.Tab>
            <Tabs.Tab value="two" isDisabled>
              Two
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="one">P1</Tabs.Panel>
            <Tabs.Panel value="two">P2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );
      const disabled = screen.getByRole('tab', { name: 'Two' });
      expect(disabled.getAttribute('data-sprocket-state') ?? '').toMatch(/\bdisabled\b/);
    });
  });

  describe('TabPanel forceMount', () => {
    test('forceMount keeps the panel mounted even when not selected', () => {
      render(
        <Tabs defaultSelectedValue="one">
          <Tabs.List aria-label="t">
            <Tabs.Tab value="one">1</Tabs.Tab>
            <Tabs.Tab value="two">2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="one">P1</Tabs.Panel>
            <Tabs.Panel value="two" forceMount>
              P2
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('P1')).toBeInTheDocument();
      const p2 = screen.getByText('P2');
      expect(p2).toBeInTheDocument();
      expect(p2).toHaveAttribute('hidden');
    });
  });

  describe('auto-generated Tab value (optional `value` prop)', () => {
    test('Tab renders fine when no value prop is provided', () => {
      render(
        <Tabs>
          <Tabs.List aria-label="auto-value">
            <Tabs.Tab>Auto One</Tabs.Tab>
            <Tabs.Tab>Auto Two</Tabs.Tab>
            <Tabs.Tab>Auto Three</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      tabs.forEach((tab) => {
        const val = tab.getAttribute('data-value');
        expect(val).toBeTruthy();
        expect(val).not.toBe('undefined');
      });
    });

    test('each auto-generated Tab gets a unique value', () => {
      render(
        <Tabs>
          <Tabs.List aria-label="auto-unique">
            <Tabs.Tab>A</Tabs.Tab>
            <Tabs.Tab>B</Tabs.Tab>
            <Tabs.Tab>C</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      const values = screen.getAllByRole('tab').map((t) => t.getAttribute('data-value'));
      expect(new Set(values).size).toBe(3);
    });

    test('clicking an auto-valued tab selects it (data-selected reflects)', async () => {
      const user = userEvent.setup();
      render(
        <Tabs>
          <Tabs.List aria-label="auto-click">
            <Tabs.Tab>Alpha</Tabs.Tab>
            <Tabs.Tab>Beta</Tabs.Tab>
            <Tabs.Tab>Gamma</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      const beta = screen.getByRole('tab', { name: 'Beta' });
      expect(beta).not.toHaveAttribute('data-selected');

      await user.click(beta);

      expect(beta).toHaveAttribute('data-selected', 'true');
      const selected = screen
        .getAllByRole('tab')
        .filter((t) => t.getAttribute('data-selected') === 'true');
      expect(selected).toHaveLength(1);
      expect(selected[0]).toHaveTextContent('Beta');
    });

    test('onSelectionChange fires with the auto-generated value when user clicks', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();

      render(
        <Tabs onSelectionChange={onSelectionChange as any}>
          <Tabs.List aria-label="auto-callback">
            <Tabs.Tab>X</Tabs.Tab>
            <Tabs.Tab>Y</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      const y = screen.getByRole('tab', { name: 'Y' });
      const yValue = y.getAttribute('data-value');
      expect(yValue).toBeTruthy();

      await user.click(y);

      expect(onSelectionChange).toHaveBeenCalledWith(yValue);
    });

    test('keyboard navigation still works across auto-valued tabs', async () => {
      const user = userEvent.setup();
      render(
        <Tabs>
          <Tabs.List aria-label="auto-keyboard">
            <Tabs.Tab>First</Tabs.Tab>
            <Tabs.Tab>Second</Tabs.Tab>
            <Tabs.Tab>Third</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'First' }));
      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'Third' })).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(screen.getByRole('tab', { name: 'First' })).toHaveFocus();
    });

    test('mix of explicit and auto-generated values: explicit ones are preserved', () => {
      render(
        <Tabs defaultSelectedValue="explicit-two">
          <Tabs.List aria-label="mixed">
            <Tabs.Tab>Auto</Tabs.Tab>
            <Tabs.Tab value="explicit-two">Explicit</Tabs.Tab>
            <Tabs.Tab>Another Auto</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      );

      const explicit = screen.getByRole('tab', { name: 'Explicit' });
      expect(explicit).toHaveAttribute('data-value', 'explicit-two');
      expect(explicit).toHaveAttribute('data-selected', 'true');

      const autoValues = screen
        .getAllByRole('tab')
        .filter((t) => t.textContent !== 'Explicit')
        .map((t) => t.getAttribute('data-value'));
      autoValues.forEach((v) => {
        expect(v).not.toBe('explicit-two');
        expect(v).toBeTruthy();
      });
    });

    test('auto-valued tab stays stable across re-renders', () => {
      function Harness({ extraProp }: { extraProp: string }) {
        return (
          <Tabs>
            <Tabs.List aria-label="stable">
              <Tabs.Tab data-extra={extraProp}>OnlyTab</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        );
      }

      const { rerender } = render(<Harness extraProp="a" />);
      const valueBefore = screen.getByRole('tab').getAttribute('data-value');
      expect(valueBefore).toBeTruthy();

      rerender(<Harness extraProp="b" />);
      const valueAfter = screen.getByRole('tab').getAttribute('data-value');

      expect(valueAfter).toBe(valueBefore);
    });
  });

  describe('Tab ↔ TabPanel pairing with auto-generated values', () => {
    test('panel without a value does NOT auto-pair with an auto-valued tab', async () => {
      const user = userEvent.setup();
      render(
        <Tabs>
          <Tabs.List aria-label="no-pair">
            <Tabs.Tab>One</Tabs.Tab>
            <Tabs.Tab>Two</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel>PanelOne</Tabs.Panel>
            <Tabs.Panel>PanelTwo</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'One' }));

      expect(screen.queryByText('PanelOne')).not.toBeInTheDocument();
      expect(screen.queryByText('PanelTwo')).not.toBeInTheDocument();
    });

    test('explicit values on panels + auto on tabs results in no pairing', async () => {
      const user = userEvent.setup();
      render(
        <Tabs>
          <Tabs.List aria-label="explicit-panels">
            <Tabs.Tab>T1</Tabs.Tab>
            <Tabs.Tab>T2</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel value="p1">Panel1</Tabs.Panel>
            <Tabs.Panel value="p2">Panel2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'T1' }));

      expect(screen.queryByText('Panel1')).not.toBeInTheDocument();
      expect(screen.queryByText('Panel2')).not.toBeInTheDocument();
    });
  });
});
