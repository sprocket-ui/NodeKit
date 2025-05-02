/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { FocusStrategy } from "@necto/types";

export interface MenuOptions<T> {
  // Alternative button renderer.
  as?: T;

  // Enable or disable autofocus.
  autoFocus?: boolean | FocusStrategy;

  // Whether keyboard navigation is circular.
  shouldFocusWrap?: boolean;
};

export interface AriaMenuOptions<T> extends MenuOptions<T> {
  // Option to enable escape key closing.
  escapeKeyBehavior?: 'clearSelection' | 'none';
}