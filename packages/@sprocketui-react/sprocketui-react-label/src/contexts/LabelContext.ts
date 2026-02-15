/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { UseLabelProps } from '../hooks/useLabel.types';

export const LabelContext = createContext<Partial<UseLabelProps> | null>(null);
