/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef } from 'react';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { TabPanels } from '../TabPanels';
import { TABS_NAME } from '../../constants';
import { TabsContext } from '../../contexts';
import { useTabs } from '../../hooks/useTabs';
import { SelectionIndicator } from '../SelectionIndicator';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabsProps } from './Tabs.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the Tabs component.
 */
function TabsFn(
  props: TabsProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, ref] = useContextProps({
    props,
    ref,
    context: TabsContext as any
  });

  const { slot, ...hookProps } = props;
  const { tabsProps, contextValue, elementType } = useTabs(hookProps);
  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {
      orientation: contextValue.orientation ?? 'horizontal'
    },
    defaultClassName: buildInternalIdentifier({
      component: TABS_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  return (
    <TabsContext.Provider value={contextValue}>
      <Primitive
        ref={ref}
        as={elementType}
        {...renderProps}
        {...mergeProps(tabsProps)}
        slot={slot || undefined}
      >
        {renderProps.children}
      </Primitive>
    </TabsContext.Provider>
  );
}

/**
 * A Tabs component for Sprocket UI.
 * Wrapper component that provides context for TabList and TabPanel.
 */
export const Tabs: ForwardRefExoticComponent<
  Omit<TabsProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabsProps, 'ref'> & RefAttributes<HTMLElement>
  >;
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
  Panels: typeof TabPanels;
  Indicator: typeof SelectionIndicator;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabsProps, 'ref'>>(
    (props: Omit<TabsProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabsFn(props as TabsProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabsProps, 'ref'>>(
      (props: Omit<TabsProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabsFn(props as TabsProps, ref)
    ),
    List: TabList,
    Tab: Tab,
    Panel: TabPanel,
    Panels: TabPanels,
    Indicator: SelectionIndicator
  }
);

Tabs.displayName = TABS_NAME;
