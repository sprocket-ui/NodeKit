/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defu } from 'defu';
import { mergeProps } from '@necto/mergers';
import { useFocusWithin } from "@necto-react/hooks";
import { filterDOMProps } from '@necto-react/helpers';

import type { RefObject} from 'react';

export function useCheckboxGroup(
  props: UseCheckboxGroupOptions,
  ref: RefObject<any>
): UseCheckboxGroupReturn {
  const {
    isDisabled,

    // Callbacks
    onBlur,
    OnFocus,
    onFocusChange
  } = defu(props);

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: onBlur,
    onFocusWithin: OnFocus,
    onFocusWithinChange: onFocusChange
  });

  let additionalProps: Record<string, unknown> = {
    role: 'group',
    'aria-disabled': isDisabled || undefined,
    ...focusWithinProps
  }

  const checkboxGroupProps: Record<string, any> = mergeProps({
    additionalProps,
    filterDOMProps(props, {
      allowLabelableProps: true
    })
  );

  return {
    checkboxGroupProps
  }
}