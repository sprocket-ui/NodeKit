/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef, useRef } from 'react';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { TabPanels } from '../TabPanels';
import { TABS_NAME } from '../../constants';
import { useTabs } from '../../hooks/useTabs';
import { useTabList } from '../../hooks/useTabList';
import { SelectionIndicator } from '../SelectionIndicator';
import { TabsContext, TabListStateContext } from '../../contexts';

import type {
  RefObject,
  ElementType,
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
  const tabListRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const { state: tabListState } = useTabList(contextValue, tabListRef);

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
      <TabListStateContext.Provider value={tabListState}>
        <Primitive
          ref={ref}
          as={elementType}
          {...renderProps}
          {...mergeProps(tabsProps)}
          slot={slot || undefined}
        >
          {renderProps.children}
        </Primitive>
      </TabListStateContext.Provider>
    </TabsContext.Provider>
  );
}

/**
 * A Tabs component for Sprocket UI.
 * Wrapper component that provides context for TabList and TabPanel.
 */
export const Tabs: ForwardRefExoticComponent<
  Omit<TabsProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabsProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
  >;
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
  Panels: typeof TabPanels;
  Indicator: typeof SelectionIndicator;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabsProps<ElementType>, 'ref'>>(
    (props: Omit<TabsProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabsFn(props as TabsProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabsProps<ElementType>, 'ref'>>(
      (props: Omit<TabsProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabsFn(props as TabsProps, ref)
    ),
    Tab: Tab,
    List: TabList,
    Panel: TabPanel,
    Panels: TabPanels,
    Indicator: SelectionIndicator
  }
);

Tabs.displayName = TABS_NAME;
