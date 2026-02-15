/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { SelectionIndicatorProps } from '../components/SelectionIndicator';

export const SelectionIndicatorContext = createContext<Partial<SelectionIndicatorProps> | null>(null);
