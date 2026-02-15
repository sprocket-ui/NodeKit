// biome-ignore-all assist/source/organizeImports: No need to sort imports.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { LABEL_NAME } from '../constants';
import { forwardRef } from 'react';
import { buildInternalIdentifier } from 'shared';
import { Primitive } from '@necto-react/components';
import { LabelContext } from '../contexts/LabelContext';
import { useLabel } from '../hooks/useLabel';
import { useContextProps, useRenderer, useId } from '@necto-react/hooks';

import type {
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { LabelProps } from './Label.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the Label component. Handles context, state, and prop merging for the label element.
 * Not intended for public use; use the exported Label component instead.
 *
 * @param {LabelProps} props - The props for the Label component.
 * @param {ForwardedRef<HTMLLabelElement>} ref - The forwarded ref for the label element.
 * @returns {ReactElement | null} The rendered label element or null.
 */
function LabelFn(
  props: LabelProps,
  ref: ForwardedRef<HTMLLabelElement>
): ReactElement | null {
  [props, ref] = useContextProps({ props, ref, context: LabelContext as any });

  const {
    labelProps,
    elementType
  } = useLabel(props, ref as any);

  const sprocketLabelID: string = useId({ defaultId: labelProps.id });
  const renderProps: UseRendererReturn = useRenderer({
    ...props,
    values: {},
    defaultClassName: buildInternalIdentifier({
      component: LABEL_NAME
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
      {...labelProps}
      id={sprocketLabelID}
      slot={props.slot || undefined}
    >
      {renderProps.children}
    </Primitive>
  );
}

/**
 * The public Label component for Sprocket UI.
 *
 * @param {LabelProps} props - The props for the Label component.
 * @param {ForwardedRef<HTMLLabelElement>} ref - The forwarded ref for the label element.
 * @returns {ReactElement | null} The rendered label element or null.
 */
export const Label: ForwardRefExoticComponent<
  Omit<LabelProps, 'ref'> & RefAttributes<HTMLLabelElement>
> & {
  Root: ForwardRefExoticComponent<
    Omit<LabelProps, 'ref'> & RefAttributes<HTMLLabelElement>
  >;
} = Object.assign(
  forwardRef<HTMLLabelElement, Omit<LabelProps, 'ref'>>((props: Omit<LabelProps, 'ref'>, ref: ForwardedRef<HTMLLabelElement>) =>
    LabelFn(props as LabelProps, ref)
  ),
  {
    Root: forwardRef<HTMLLabelElement, Omit<LabelProps, 'ref'>>(
      (props: Omit<LabelProps, 'ref'>, ref: ForwardedRef<HTMLLabelElement>) => LabelFn(props as LabelProps, ref)
    )
  }
);

Label.displayName = LABEL_NAME;