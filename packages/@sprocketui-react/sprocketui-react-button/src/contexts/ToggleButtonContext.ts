/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext } from 'react';

import type { Context } from 'react';
import type { UseToggleButtonOptions } from '../hooks/useToggleButton/useToggleButton.types';

export const ToggleButtonContext: Context<Partial<UseToggleButtonOptions<'button'>> | null> =
	createContext<Partial<UseToggleButtonOptions<'button'>> | null>(null);
