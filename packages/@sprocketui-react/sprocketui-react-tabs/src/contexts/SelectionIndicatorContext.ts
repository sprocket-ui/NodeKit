/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context } from 'react';
import type { SelectionIndicatorProps } from '../components/SelectionIndicator';

export const SelectionIndicatorContext: Context<Partial<SelectionIndicatorProps<'div'>> | null> = createContext<Partial<SelectionIndicatorProps> | null>(null);
