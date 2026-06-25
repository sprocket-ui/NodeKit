/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context } from 'react';
import type { UseLabelProps } from '../hooks/useLabel/useLabel.types';

export const LabelContext: Context<Partial<UseLabelProps<"label">> | null> = createContext<Partial<UseLabelProps> | null>(null);
