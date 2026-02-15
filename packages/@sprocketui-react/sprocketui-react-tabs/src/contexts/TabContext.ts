/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import { Context } from 'react';
import type { TabProps } from '../components/Tab';

export const TabContext: Context<Partial<TabProps<'div'>> | null> = createContext<Partial<TabProps> | null>(null);
