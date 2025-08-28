/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { forwardRef } from 'react';
import { HTMLElements } from '@necto/dom';
import { Primitive } from '@necto-react/components';

import type {
  MouseEvent,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import type { LabelProps } from './Label.types';

const LABEL_NAME = 'Label' as const;

function LabelFn(
  props: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>
): ReactElement | null {
  return (
    <Primitive.Label
      {...props}
      ref={ref}
      onMouseDown={(event: MouseEvent): void => {
        const target = event.target as HTMLElement;
        if (target.closest([...new Set([
          HTMLElements.Input,
          HTMLElements.Button,
          HTMLElements.Select,
          HTMLElements.Textarea
        ].filter(Boolean))].join(', '))) return;

        props.onMouseDown?.(event as MouseEvent<HTMLLabelElement>);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }}
    />
   )
};

export const Label: ForwardRefExoticComponent<
  Omit<LabelProps, 'ref'> & RefAttributes<HTMLButtonElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<LabelProps, 'ref'> & RefAttributes<HTMLButtonElement>
  >;
} = Object.assign(
  forwardRef<HTMLButtonElement, Omit<LabelProps, 'ref'>>((props, ref) =>
    LabelFn(props as LabelProps, ref as any)
  ),
  {
    Root: forwardRef<HTMLButtonElement, Omit<LabelProps, 'ref'>>(
      (props, ref) => LabelFn(props as LabelProps, ref as any)
    )
  }
);

Label.displayName = LABEL_NAME;