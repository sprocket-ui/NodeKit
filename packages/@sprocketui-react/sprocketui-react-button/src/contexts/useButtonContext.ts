/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext } from 'react';
import { ButtonContext } from './ButtonContext';

export function useButtonContext() {
  return useContext(ButtonContext);
}
