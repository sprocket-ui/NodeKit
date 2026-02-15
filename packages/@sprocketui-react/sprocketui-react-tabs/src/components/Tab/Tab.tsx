/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import invariant from 'tiny-invariant';
import { kebabCase } from '@necto/strings';
import { mergeProps } from '@necto/mergers';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContext, useMemo, forwardRef } from 'react';
import { useContextProps, useRenderer, useId } from '@necto-react/hooks';

import { TAB_NAME } from '../../constants';
import { useTab } from '../../hooks/useTab/useTab';
import { TabContext, TabListStateContext } from '../../contexts';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TabProps } from './Tab.types';
import type { UseRendererReturn } from '@necto-react/hooks';
import type { TabsState } from '../../types';

/**
 * @internal
 * Internal render function for the Tab component.
 */
function TabFn(
  props: TabProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, ref] = useContextProps({ props, ref, context: TabContext as any });

  const state: TabsState | null = useContext(TabListStateContext);

  invariant(state, 'Tab must be used within a TabList');

  const {
    tabProps,
    elementType,
    isHovered,
    isPressed,
    isFocused,
    isDisabled,
    isSelected,
    isFocusVisible
  } = useTab(props, state, ref as any);

  const sprocketTabID: string = useId({ defaultId: tabProps.id });

  const renderProps: UseRendererReturn = useRenderer({
    ...(props as any),
    values: {
      isHovered,
      isPressed,
      isFocused,
      isFocusVisible,
      isDisabled,
      isSelected
    },
    defaultClassName: buildInternalIdentifier({
      component: TAB_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  const dataAttributes = useMemo(() => {
    const stateAttributes: Record<string, boolean | undefined> = {
      hover: isHovered,
      focus: isFocused,
      focusVisible: isFocusVisible,
      disabled: isDisabled,
      pressed: isPressed,
      selected: isSelected
    };

    const attributes: Record<string, string | undefined> = {};
    const sprocketState: string[] = [];

    for (const [key, value] of Object.entries(stateAttributes)) {
      if (typeof value === 'boolean') {
        attributes[`data-${kebabCase(key)}`] = value ? String(true) : undefined;
        if (value) {
          sprocketState.push(kebabCase(key));
        }
      }
    }

    return {
      ...attributes,
      'data-sprocket-state': sprocketState.join(' ')
    };
  }, [isHovered, isFocused, isFocusVisible, isDisabled, isPressed, isSelected]);

  return (
    <Primitive
      ref={ref}
      as={elementType}
      {...renderProps}
      {...mergeProps(tabProps, dataAttributes)}
      id={sprocketTabID}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * A Tab component for Sprocket UI.
 * Must be used within a TabList component.
 */
export const Tab: ForwardRefExoticComponent<
  Omit<TabProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<TabProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<TabProps, 'ref'>>(
    (props: Omit<TabProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      TabFn(props as TabProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<TabProps, 'ref'>>(
      (props: Omit<TabProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        TabFn(props as TabProps, ref)
    )
  }
);

Tab.displayName = TAB_NAME;
