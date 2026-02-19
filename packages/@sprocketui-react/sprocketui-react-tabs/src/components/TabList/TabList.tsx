/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps, mergeRefs } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContext, forwardRef, useRef } from 'react';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { TAB_LIST_NAME } from '../../constants';
import { useTabList } from '../../hooks/useTabList';
import { TabListStateContext, TabListContext, TabsContext } from '../../contexts';

import type {
  RefObject,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabListProps } from './TabList.types';
import type { UseRendererReturn } from '@necto-react/hooks';
import type { UseTabsOptions } from '../../hooks/useTabs';

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

  const tabsContext: Partial<UseTabsOptions<"div">> | null = useContext(TabsContext);
  const internalRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

  const mergedProps = tabsContext ? { ...tabsContext, ...props } : props;

  const { tabListProps, elementType, state } = useTabList(
    mergedProps,
    internalRef
  );

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
      <Primitive
        ref={mergeRefs(forwardedRef, internalRef)}
        as={elementType}
        {...renderProps}
        {...mergeProps(tabListProps)}
        slot={props.slot || undefined}
      >
        {renderProps.children}
      </Primitive>
    </TabListStateContext.Provider>
  );
}

/**
 * A TabList component for Sprocket UI.
 * Contains Tab components and manages keyboard navigation.
 */
export const TabList: ForwardRefExoticComponent<
  Omit<TabListProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabListProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabListProps, 'ref'>>(
    (props: Omit<TabListProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabListFn(props as TabListProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabListProps, 'ref'>>(
      (props: Omit<TabListProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabListFn(props as TabListProps, ref)
    )
  }
);

TabList.displayName = TAB_LIST_NAME;
