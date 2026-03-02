/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ReactNode } from 'react';
import type { UseTooltipTriggerOptions } from '../../hooks/useTooltipTrigger';

export interface TooltipProps extends UseTooltipTriggerOptions {
  children: ReactNode;
}
