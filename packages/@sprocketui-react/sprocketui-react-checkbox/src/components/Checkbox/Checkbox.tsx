/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext, forwardRef } from 'react';
import { useContextProps } from '@necto-react/hooks';
import { VisuallyHidden} from "@necto-react/components";

import { CheckboxContext } from '../../contexts';

import type { CheckboxProps } from './Checkbox.type';
import type { ForwardedRef, ReactElement } from 'react';

function CHeckboxFn(
  props: CheckboxProps,
  ref: ForwardedRef<HTMLLabelElement>
): ReactElement {
  [props, ref] = useContextProps({ props, ref, context: CheckboxContext as any });

  return (
    <label ref={ref}>
      <VisuallyHidden as="span">
        <input

        />
      </VisuallyHidden>
    </label>
  )
}