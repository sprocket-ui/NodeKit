/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { RefObject, HTMLAttributes, CSSProperties } from 'react';
import type { PopoverOptions, PopoverPlacement } from '@sprocketui-types/popover';

interface UsePopoverCallbackProps {
  // Callback when user interacts outside the popover.
  shouldCloseOnInteractOutside?: (element: Element) => boolean;
}

export interface UsePopoverProps extends PopoverOptions, UsePopoverCallbackProps {
  // The ref for the element which the popover positions itself with respect to.
  triggerRef: RefObject<Element | null>;

  // The ref for the popover element.
  popoverRef: RefObject<HTMLElement | null>;

  // A ref for the popover arrow element.
  arrowRef?: RefObject<HTMLElement | null>;

  // Whether the popover is non-modal, i.e. elements outside the popover may be interacted with.
  isNonModal?: boolean;

  // Whether pressing the escape key to close the popover should be disabled.
  isKeyboardDismissDisabled?: boolean;
}

export type UsePopoverReturn = Readonly<{
  // Props for the popover element.
  popoverProps: HTMLAttributes<any> & { ref?: any };

  // Props for the popover tip arrow if any.
  arrowProps: HTMLAttributes<any> & { ref?: any };

  // Props to apply to the underlay element, if any.
  underlayProps: HTMLAttributes<any>;

  // Whether the popover is currently open.
  isOpen: boolean;

  // Whether the popover is positioned and ready to display.
  isPositioned: boolean;

  // Placement of the popover with respect to the trigger.
  placement: PopoverPlacement;

  // Positioning styles for the popover.
  floatingStyles: CSSProperties;
}>;
