/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * The possible values for tabs orientation.
 */
export enum TabsOrientationValues {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

/**
 * String literal type for allowed tabs orientation.
 */
export type TabsOrientation = `${TabsOrientationValues}`;
