/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext } from 'react';
import { PopoverContext } from './PopoverContext';

import type { PopoverContextValue } from './PopoverContext';

export function usePopoverContext(): PopoverContextValue {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover compound components must be used within Popover.Root');
  }
  return context;
}
