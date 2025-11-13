/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context, RefObject } from 'react';
import type { PopoverState } from '../components/Popover.types';
import type { PopoverPlacement } from '@sprocketui-types/popover';

export interface PopoverContextValue extends PopoverState {
  triggerRef: RefObject<HTMLElement | null>;
  popoverRef: RefObject<HTMLElement | null>;
  arrowRef: RefObject<HTMLElement | null>;
  isNonModal: boolean;
  placement?: PopoverPlacement;
}

export const PopoverContext: Context<PopoverContextValue | null> = createContext<PopoverContextValue | null>(null);
