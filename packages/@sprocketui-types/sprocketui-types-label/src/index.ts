/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ElementType } from 'react';

/**
 * Options for configuring a Sprocket UI Label component.
 *
 * @template T The element type to render as (e.g., 'label', 'span').
 */
export interface LabelOptions<T = ElementType> {
  /** Alternative label renderer. */
  as?: T;

  /** The id of the element this label is associated with. */
  htmlFor?: string;

  /** The id attribute for the label element. */
  id?: string;
}

export type { LabelOptions as default };
