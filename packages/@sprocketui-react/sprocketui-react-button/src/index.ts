/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

export * from './hooks/useButton';
export * from './hooks/useButtonContext';
export * from './components/Button';

// Alias hook and component exports
export { Button as SprocketButton } from './components/Button';
export { useButton as useSprocketButton } from './hooks/useButton';

// Alias type exports
export type { ButtonProps as SprocketButtonProps } from './components/Button';
