/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import invariant from 'tiny-invariant';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { useContext, forwardRef } from 'react';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { SELECTION_INDICATOR_NAME, DEFAULT_TAB_TAG } from '../../constants';
import { SelectionIndicatorContext, TabListStateContext, TabListRefContext } from '../../contexts';
import { useSelectionIndicator } from '../../hooks/useSelectionIndicator';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { UseRendererReturn } from '@necto-react/hooks';
import type { SelectionIndicatorProps } from './SelectionIndicator.types';

/**
 * @internal
 * Internal render function for the SelectionIndicator component.
 */
function SelectionIndicatorFn(
  props: SelectionIndicatorProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, ref] = useContextProps({
    props,
    ref,
    context: SelectionIndicatorContext as any
  });

  const state = useContext(TabListStateContext);
  invariant(state, 'SelectionIndicator must be used within a TabList');

  const tabListRef = useContext(TabListRefContext);
  invariant(tabListRef, 'SelectionIndicator must be used within a TabList');

  const { elementType = props.as ?? DEFAULT_TAB_TAG, slot } = props;

  const { isSelected, metrics, indicatorStyle, selectionIndicatorProps } = useSelectionIndicator({
    state,
    tabListRef
  });

  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {
      isSelected,
      selectedRect: metrics
    },
    defaultClassName: buildInternalIdentifier({
      component: SELECTION_INDICATOR_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style),
      ...indicatorStyle
    })
  });

  return (
    <Primitive
      ref={ref}
      as={elementType}
      {...renderProps}
      {...selectionIndicatorProps}
      aria-hidden="true"
      slot={slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * A SelectionIndicator component for Sprocket UI.
 * Visual indicator for the currently selected tab.
 * Must be used within a TabList component.
 */
export const SelectionIndicator: ForwardRefExoticComponent<
  Omit<SelectionIndicatorProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<SelectionIndicatorProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<SelectionIndicatorProps, 'ref'>>(
    (props: Omit<SelectionIndicatorProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      SelectionIndicatorFn(props as SelectionIndicatorProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<SelectionIndicatorProps, 'ref'>>(
      (props: Omit<SelectionIndicatorProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        SelectionIndicatorFn(props as SelectionIndicatorProps, ref)
    )
  }
);

SelectionIndicator.displayName = SELECTION_INDICATOR_NAME;
