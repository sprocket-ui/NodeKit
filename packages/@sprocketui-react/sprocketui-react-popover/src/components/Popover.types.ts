/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ReactNode } from 'react';

/**
 * State interface for the Popover component.
 *
 * Manages the open/close state of the popover overlay.
 */
export interface PopoverState {
  // Whether the popover is currently open.
  isOpen: boolean;

  // Function to open the popover.
  open: () => void;

  // Function to close the popover.
  close: () => void;

  // Function to toggle the popover open/close state.
  toggle: () => void;
}

/**
 * Props for the PopoverRoot component.
 *
 * Root component that manages state and provides context for compound components.
 */
export interface PopoverProps {
  // The controlled open state of the popover.
  open?: boolean;

  // The default open state (uncontrolled).
  defaultOpen?: boolean;

  // Callback when the open state changes.
  onOpenChange?: (open: boolean) => void;

  // Whether the popover is modal (default: true).
  modal?: boolean;

  // Children components (Trigger, Content, etc.).
  children: ReactNode;
}
