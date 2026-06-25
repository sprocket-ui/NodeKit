/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { assert } from '@necto/assert';
import { mergeProps } from '@necto/mergers';
import { useContext, forwardRef } from 'react';
import { Primitive } from '@necto-react/components';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { TAB_PANEL_NAME } from '../../constants';
import { useTabPanel } from '../../hooks/useTabPanel';
import { TabPanelContext, TabListStateContext } from '../../contexts';

import type {
  ElementType,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabsState } from '../../types';
import type { TabPanelProps } from './TabPanel.types';
import type { UseRendererReturn } from '@necto-react/hooks';

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
  assert(state, 'TabPanel must be used within a Tabs component');

  const { forceMount = false } = props;
  // Exclude value from props spread since useRenderer expects string id, but TabPanel uses Key value
  const { value: _value, ...renderableProps } = props;
  const { tabPanelProps, elementType, isSelected } = useTabPanel(props, state);

  const renderProps: UseRendererReturn = useRenderer({
    ...renderableProps,
    values: {
      isSelected
    },
    defaultClassName: `__sprocket:=[${TAB_PANEL_NAME.toLowerCase()}]`,
    style: (values: any) => ({
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
  Omit<TabPanelProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabPanelProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabPanelProps<ElementType>, 'ref'>>(
    (props: Omit<TabPanelProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabPanelFn(props as TabPanelProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabPanelProps<ElementType>, 'ref'>>(
      (props: Omit<TabPanelProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabPanelFn(props as TabPanelProps, ref)
    )
  }
);

TabPanel.displayName = TAB_PANEL_NAME;
