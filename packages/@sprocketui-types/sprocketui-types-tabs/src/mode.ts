/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * The possible values for tabs activation mode.
 */
export enum TabsActivationModeValues {
  Automatic = 'automatic',
  Manual = 'manual'
}

/**
 * String literal type for allowed tabs activation mode.
 */
export type TabsActivationMode = `${TabsActivationModeValues}`;
