/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// !! This code uses Adobe's React Aria for now, this will be ported to
// !! use Necto later. Please use this code with caution as things will
// !! change and will introduce breaking changes to applications.

'use client';

import { mergeProps } from "@necto/mergers";
import { filterDOMProps } from "@necto-react/helpers";
import { DOM } from "@necto/constants";
import { useSelectableList } from '@react-aria/selection'; // This will change and break apps!!

import type { KeyboardEvent, RefObject } from 'react';
import type { TreeState } from '@react-stately/tree';
import type { AriaMenuOptions } from '@sprocketui/types';
import type { KeyboardDelegate, Key } from '@necto/types';
import type { DOMAttributes, KeyboardEvents } from '@necto-react/types';

interface MenuHookResult {
  // Props for the menu element.
  menuProps: DOMAttributes;
}

interface MenuHookProps<T> extends AriaMenuOptions<T>, KeyboardEvents {
  // Enable virtual scrolling inside of the menu.
  isVirtualized?: boolean;

  // Wether menu item should use virtual focus instead of direct focus.
  shouldUseVirtualFocus?: boolean;

  // Optional keyboard delegation override.
  keyboardDelegate?: KeyboardDelegate;

  // Callback handler when item is selected.
  onAction?: (ley: Key) => void;

  // Callback handler when menu is closed after selection of item.
  onClose?: () => void;
};

const menuData = new WeakMap<TreeState<unknown>, {
  onClose?: () => void;
  onAction?: (key: Key) => void;
  shouldUseVirtualFocus?: boolean;
}>();

export function useMenu<T>(props: MenuHookProps<T>, state: any, ref: RefObject<HTMLElement | null>): MenuHookResult {
  const {
    shouldFocusWrap = false,
    onKeyDown,
    onKeyUp,
    ...otherProps
  } = props;

  // Insert ARIA labels here ofr accessability!!

  let domProps = filterDOMProps(props as any, {
    allowLabelableProps: true,
    allowedLabelableProps: new Set([ ]), // Keep this empty for now,
    allowedLinkProps: new Set(DOM.ANCHOR_ELEMENT_PROPS),
    extraAllowedProps: new Set(['id', 'className', 'style', 'data-*', 'aria-*'])
  });

  let { listProps } = useSelectableList({
    ...otherProps,
    ref,
    selectionManager: state.selectionManager,
    collection: state.collection,
    disabledKeys: state.disabledKeys,
    shouldFocusWrap,
    linkBehavior: 'override'
  });

  menuData.set(state, {
    onClose: props.onClose,
    onAction: props.onAction,
    shouldUseVirtualFocus: props.shouldUseVirtualFocus
  });

  return {
    menuProps: mergeProps(domProps, { onKeyDown, onKeyUp }, {
      role: 'menu',
      ...listProps,
      onKeyDown: (event: KeyboardEvent) => {
        if (event.key !== 'Escape' || props.shouldUseVirtualFocus) {
          listProps.onKeyDown?.(event as KeyboardEvent<HTMLElement | SVGElement>);
        }
      }
    })
  };
}

