/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Placement, Padding, Strategy } from '@floating-ui/utils';

export interface PopoverOptions {
  // The placement of the element with respect to anchor.
  placement?: Placement;

  // The placement padding that should be applied between element and anchor.
  containerPadding?: Padding;

  // Offset applied along the main axis between element and anchor.
  offset?:
    | number
    | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null };

  // Whether the element should flip its orientation when there is no room.
  flip?: boolean;

  // Position strategy that is ued.
  strategy?: Strategy;

  // Max width position
  maxWidth?: number | string;
}
