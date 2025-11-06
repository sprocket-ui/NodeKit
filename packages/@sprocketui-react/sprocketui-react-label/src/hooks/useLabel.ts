/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HTMLElements } from '@necto/dom';

import type { RefObject } from 'react';
import type { UseLabelReturn } from './useLabel.types';

const DEFAULT_LABEL_TAG: keyof HTMLElementTagNameMap = HTMLElements.Label;

export function useLabel(
  props: UseLabelProps,
  ref: RefObject<any>
): UseLabelReturn {
  const {
    label,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,

    // Duplicate props for convenance.
    as: Tag = DEFAULT_LABEL_TAG,
    elementType = Tag || DEFAULT_LABEL_TAG,
  } = props;
}