/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Key } from 'react';
import type { TabsState } from './types';

/** WeakMap to store base IDs per TabsState instance. */
export const tabsIds = new WeakMap<TabsState, string>();

/** Generates a unique ID for tab elements. */
export function generateId(state: TabsState | null, key: Key | null | undefined, role: string): string {
  if (!state) return '';

  if (typeof key === 'string') {
    key = key.replace(/\s+/g, '');
  }

  const baseId: string | undefined = tabsIds.get(state);
  return `${baseId}-${role}-${key}`;
}
