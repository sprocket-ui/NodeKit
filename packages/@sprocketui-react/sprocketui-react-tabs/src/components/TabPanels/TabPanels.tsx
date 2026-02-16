/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef } from 'react';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { TabPanelsContext } from '../../contexts';
import { TAB_PANELS_NAME, DEFAULT_TAB_TAG } from '../../constants';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabPanelsProps } from './TabPanels.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the TabPanels component.
 */
function TabPanelsFn(
  props: TabPanelsProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, ref] = useContextProps({
    props,
    ref,
    context: TabPanelsContext as any
  });

  const { elementType = props.as ?? DEFAULT_TAB_TAG, slot } = props;
  
  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {},
    defaultClassName: buildInternalIdentifier({
      component: TAB_PANELS_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  return (
    <Primitive
      ref={ref}
      as={elementType}
      {...renderProps}
      slot={slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * A TabPanels component for Sprocket UI.
 * Container for TabPanel components.
 */
export const TabPanels: ForwardRefExoticComponent<
  Omit<TabPanelsProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabPanelsProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabPanelsProps, 'ref'>>(
    (props: Omit<TabPanelsProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabPanelsFn(props as TabPanelsProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabPanelsProps, 'ref'>>(
      (props: Omit<TabPanelsProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabPanelsFn(props as TabPanelsProps, ref)
    )
  }
);

TabPanels.displayName = TAB_PANELS_NAME;
