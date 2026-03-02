/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export interface TooltipState {
  // Whether the tooltip is currently open.
  isOpen: boolean;

  // Function to open the tooltip. Pass immediate to skip warmup delay.
  open(immediate?: boolean): void;

  // Function to close the tooltip. Pass immediate to skip close delay.
  close(immediate?: boolean): void;
}
