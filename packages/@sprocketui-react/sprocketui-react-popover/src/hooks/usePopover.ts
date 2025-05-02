/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';


import type { ElementType } from 'react';
import type { Placement } from "@floating-ui/utils";
import type { DOMAttributes } from "@necto-react/types";

const DEFAULT_POPOVER_TAG = 'div';

interface PopoverHookProps {

};

interface PopoverHookResults<TTag extends ElementType = typeof DEFAULT_POPOVER_TAG> {
  popoverProps?: DOMAttributes;
  arrowProps?: DOMAttributes;
  underlayProps?: DOMAttributes;
  placement?: Placement;
};

function usePopover(props, state): PopoverHookResults {
  const {
    triggerRef,
    popoverRef,
    groupRef,
    isNonModal,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    ...otherProps
  } = props;


};

export {
  usePopover,
  type PopoverHookProps,
  type PopoverHookResults
}