/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { TabsOrientationValues } from './orientation';
import { TabsActivationModeValues } from './mode';

import type { TabsOrientation } from './orientation';
import type { TabsActivationMode } from './mode';

/**
 * Options for configuring a Sprocket UI Tabs component.
 *
 * @template T The element type to render as.
 */
interface TabsOptions<T> {
  /** Alternative element renderer. */
  as?: T;

  /** The orientation of the tabs. @default 'horizontal' */
  orientation?: TabsOrientation;

  /** The activation mode for tabs. @default 'automatic' */
  activationMode?: TabsActivationMode;

  /** Whether all tabs are disabled. */
  disabled?: boolean;

  /** The id attribute for the tabs element. */
  id?: string;
}

export { TabsOrientationValues, TabsActivationModeValues };

export type { TabsOptions, TabsOrientation, TabsActivationMode };
