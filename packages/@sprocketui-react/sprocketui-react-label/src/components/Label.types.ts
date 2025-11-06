/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { MouseEvent } from 'react';
import type { LabelOptions } from '@sprocketui-types/label';

export interface LabelProps extends LabelOptions {
  asChild?: boolean;

  onMouseDown?: (event: MouseEvent<HTMLLabelElement>) => void;
}