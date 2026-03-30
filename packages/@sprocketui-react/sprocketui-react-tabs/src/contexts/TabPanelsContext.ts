/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context } from 'react';
import type { TabPanelsProps } from '../components/TabPanels';

export const TabPanelsContext: Context<Partial<TabPanelsProps<'div'>> | null> = createContext<Partial<TabPanelsProps> | null>(null);
