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
import { useRef, forwardRef } from 'react';
import { mergeProps, mergeRefs } from '@necto/mergers';
import { useContextProps, useRenderer } from '@necto-react/hooks';

import { ProgressBarContext } from '../../contexts';
import { useProgressBar } from '../../hooks/useProgressBar';
import { PROGRESS_BAR_NAME, DEFAULT_PROGRESS_BAR_TAG } from '../../constants';

import type {
  RefObject,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { UseRendererReturn } from '@necto-react/hooks';
import type { ProgressBarProps } from './ProgressBar.types';

/**
 * @internal
 * Internal render function for the ProgressBar component.
 */
function ProgressBarFn(
  props: ProgressBarProps,
  forwardedRef: ForwardedRef<HTMLElement>
): ReactElement | null {
  [props, forwardedRef] = useContextProps({
    props,
    ref: forwardedRef,
    context: ProgressBarContext as any
  });

  const internalRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const { elementType = props.as ?? DEFAULT_PROGRESS_BAR_TAG, slot } = props;

  const { labelProps, progressBarProps, percentage, isIndeterminate, isHung } = useProgressBar(
    props,
    internalRef
  );

  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {
      percentage,
      isIndeterminate,
      isHung
    },
    defaultClassName: buildInternalIdentifier({
      component: PROGRESS_BAR_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  return (
    <Primitive
      ref={mergeRefs(forwardedRef, internalRef)}
      as={elementType}
      {...renderProps}
      {...mergeProps(progressBarProps)}
      slot={slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * A ProgressBar component for Sprocket UI.
 * Displays a visual indicator of progress toward completion.
 */
export const ProgressBar: ForwardRefExoticComponent<
  Omit<ProgressBarProps, 'ref'> & RefAttributes<HTMLElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<ProgressBarProps, 'ref'> & RefAttributes<HTMLElement>
  >;
} = Object.assign(
  forwardRef<HTMLElement, Omit<ProgressBarProps, 'ref'>>(
    (props: Omit<ProgressBarProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
      ProgressBarFn(props as ProgressBarProps, ref)
  ),
  {
    Root: forwardRef<HTMLElement, Omit<ProgressBarProps, 'ref'>>(
      (props: Omit<ProgressBarProps, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
        ProgressBarFn(props as ProgressBarProps, ref)
    )
  }
);

ProgressBar.displayName = PROGRESS_BAR_NAME;
