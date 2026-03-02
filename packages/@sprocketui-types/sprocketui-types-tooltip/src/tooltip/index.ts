/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Placement } from '@necto/popper';

export interface TooltipOptions {
  entering?: boolean;

  offset?: number;

  exiting?: boolean;

  defaultOpen?: boolean;

  shouldFlip?: boolean;

  containerPadding?: number;

  arrowOffset?: number;

  placement?: Placement;
}