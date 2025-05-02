/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useMenu } from '../hooks/useMenu';
import { createContext, forwardRef } from 'react';
import { useContextProps } from '@necto-react/hooks';
import { useTreeState } from '@react-stately/tree';

import type { MenuOptions } from '@sprocketui/types';
import type { SlottedContextValue } from '@necto-react/types';
import type { ComponentPropsWithoutRef, ReactNode, ElementType, ForwardedRef, ReactElement } from 'react';

const MENU_NAME = 'Menu' as const;
const DEFAULT_MENU_TAG = 'div' as const;

type MenuProps<TTag extends ElementType = typeof DEFAULT_MENU_TAG> = ComponentPropsWithoutRef<TTag> & MenuOptions<TTag> & {
  renderEmptyState?: () => ReactNode;
}

type MenuContextType<TTag extends ElementType = typeof DEFAULT_MENU_TAG> =
  SlottedContextValue<MenuProps<TTag>, HTMLDivElement>;

const MenuContext = createContext<MenuContextType>({});
const MenuStateContext = createContext<any>(null);

function MenuFn<TTag extends ElementType = typeof DEFAULT_MENU_TAG>(
  props: MenuProps<TTag>,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement | null {
  [props, ref] = useContextProps(props, ref as ForwardedRef<HTMLDivElement>, MenuContext);

  const { children, renderEmptyState, ...otherProps } = props;

  // Create a tree state from the children
  const state = useTreeState({
    children: () => children
  });

  // Now we have a state to pass to useMenu
  const { menuProps } = useMenu({...props, onClose: props.onClose}, state, ref);

  // Check if there are any children to render
  const hasChildren = Boolean(children);
  const isEmpty = state.collection.size === 0;

  return (
    <MenuStateContext.Provider value={state}>
      <div
        ref={ref}
        {...menuProps}
        {...otherProps}
        data-empty={isEmpty || undefined}
      >
        {!isEmpty ? (
          children
        ) : (
          renderEmptyState?.()
        )}
      </div>
    </MenuStateContext.Provider>
  );
}

const Menu = Object.assign(forwardRef(MenuFn), {
  Root: forwardRef(MenuFn)
});

Menu.displayName = MENU_NAME;

export {
  Menu,
  MenuContext,
  MenuStateContext,
  type MenuProps,
  type MenuContextType
};
