/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import invariant from 'tiny-invariant';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContext, forwardRef } from 'react';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { TAB_PANEL_NAME } from '../../constants';
import { useTabPanel } from '../../hooks/useTabPanel';
import { TabPanelContext, TabListStateContext } from '../../contexts';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabPanelProps } from './TabPanel.types';
import type { UseRendererReturn } from '@necto-react/hooks';
import type { TabsState } from '../../types';

/**
 * @internal
 * Internal render function for the TabPanel component.
 */
function TabPanelFn(
  props: TabPanelProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, ref] = useContextProps({
    props,
    ref,
    context: TabPanelContext as any
  });

  const state: TabsState | null = useContext(TabListStateContext);

  invariant(state, 'TabPanel must be used within a Tabs component');

  const { forceMount = false } = props;
  const { tabPanelProps, elementType, isSelected } = useTabPanel(props, state);

  // Exclude value from props spread since useRenderer expects string id, but TabPanel uses Key value
  const { value: _value, ...renderableProps } = props;

  const renderProps: UseRendererReturn = useRenderer({
    ...renderableProps,
    values: {
      isSelected
    },
    defaultClassName: buildInternalIdentifier({
      component: TAB_PANEL_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  if (!isSelected && !forceMount) {
    return null;
  }

  return (
    <Primitive
      ref={ref}
      as={elementType}
      {...renderProps}
      {...mergeProps(tabPanelProps)}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * A TabPanel component for Sprocket UI.
 * Must be used within a Tabs component.
 */
export const TabPanel: ForwardRefExoticComponent<
  Omit<TabPanelProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabPanelProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabPanelProps, 'ref'>>(
    (props: Omit<TabPanelProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabPanelFn(props as TabPanelProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabPanelProps, 'ref'>>(
      (props: Omit<TabPanelProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabPanelFn(props as TabPanelProps, ref)
    )
  }
);

TabPanel.displayName = TAB_PANEL_NAME;
