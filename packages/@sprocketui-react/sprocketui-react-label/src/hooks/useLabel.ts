// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/suspicious/noExplicitAny: Explicit any is okay here.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useId } from '@necto-react/hooks';
import { filterDOMProps } from '@necto-react/helpers';
import { mergeProps } from '@necto/mergers';
import { ALLOWED_EXTERNAL_PROPS } from 'shared';
import { DEFAULT_LABEL_TAG } from '../constants';

import type { ElementType, RefObject, MouseEvent } from 'react';
import type { UseLabelProps, UseLabelReturn } from './useLabel.types';

/**
 * React hook that provides all necessary props and state for a headless label component.
 *
 * @template T The element type to render as (e.g., 'label', 'span').
 * @param {UseLabelProps<T>} props - The props for configuring the label's behavior and accessibility.
 * @param {RefObject<any>} ref - The ref to the label element.
 * @returns {UseLabelReturn<T>} An object containing props for the label element and field props.
 */
export function useLabel<T extends ElementType = typeof DEFAULT_LABEL_TAG>(
  props: UseLabelProps<T>,
  ref: RefObject<any>
): UseLabelReturn<T> {
  const {
    id,
    htmlFor,
    elementType = props.as || DEFAULT_LABEL_TAG,
    onMouseDown
  } = props;

  const labelId = useId({ defaultId: id });

  const handleMouseDown = (event: MouseEvent<HTMLLabelElement>): void => {
    // Only prevent text selection if clicking inside the label itself
    const target = event.target as HTMLElement;
    if (target.closest('button, input, select, textarea')) return;

    onMouseDown?.(event as any);

    // Prevent text selection when double clicking label
    if (!event.defaultPrevented && event.detail > 1) {
      event.preventDefault();
    }
  };

  const labelProps = mergeProps(
    {
      id: labelId,
      htmlFor: elementType === 'label' ? htmlFor : undefined,
      onMouseDown: handleMouseDown
    },
    filterDOMProps(props, {
      extraAllowedProps: new Set(ALLOWED_EXTERNAL_PROPS)
    })
  );

  const fieldProps = htmlFor ? { 'aria-labelledby': labelId } : {};

  return {
    labelProps,
    fieldProps,
    elementType: elementType as T
  };
}