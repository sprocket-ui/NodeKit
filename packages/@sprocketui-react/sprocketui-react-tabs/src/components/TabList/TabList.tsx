/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContext, forwardRef, useRef } from 'react';
import { mergeProps, mergeRefs } from '@necto/mergers';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { TAB_LIST_NAME } from '../../constants';
import { useTabList } from '../../hooks/useTabList';
import { TabListStateContext, TabListContext, TabListRefContext, TabsContext } from '../../contexts';

import type {
  RefObject,
  ElementType,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabsState } from '../../types';
import type { TabListProps } from './TabList.types';
import type { UseTabsOptions } from '../../hooks/useTabs';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the TabList component.
 */
function TabListFn(
  props: TabListProps,
  forwardedRef: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, forwardedRef] = useContextProps({
    props,
    ref: forwardedRef,
    context: TabListContext as any
  });

  const parentState: TabsState | null = useContext(TabListStateContext);
  const tabsContext: Partial<UseTabsOptions<"div">> | null = useContext(TabsContext);
  const internalRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

  const mergedProps: TabListProps<'div'> = tabsContext ? { ...tabsContext, ...props } : props;
  const { tabListProps, elementType, state: localState } = useTabList(
    mergedProps,
    internalRef
  );

  const state: TabsState = parentState ?? localState;
  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {
      orientation: state.orientation
    },
    defaultClassName: buildInternalIdentifier({
      component: TAB_LIST_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  return (
    <TabListStateContext.Provider value={state}>
      <TabListRefContext.Provider value={internalRef}>
        <Primitive
          as={elementType}
          slot={props.slot || undefined}
          ref={mergeRefs(forwardedRef, internalRef)}
          {...renderProps}
          {...mergeProps(tabListProps)}
        >
          {renderProps.children}
        </Primitive>
      </TabListRefContext.Provider>
    </TabListStateContext.Provider>
  );
}

/**
 * A TabList component for Sprocket UI.
 * Contains Tab components and manages keyboard navigation.
 */
export const TabList: ForwardRefExoticComponent<
  Omit<TabListProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabListProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabListProps<ElementType>, 'ref'>>(
    (props: Omit<TabListProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabListFn(props as TabListProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabListProps<ElementType>, 'ref'>>(
      (props: Omit<TabListProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabListFn(props as TabListProps, ref)
    )
  }
);

TabList.displayName = TAB_LIST_NAME;
