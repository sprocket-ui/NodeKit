/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { createContext, useContext } from 'react';

interface ButtonContextProps {

};

const ButtonContext = createContext<ButtonContextProps>({}); // Cast to empty obj for now.

function useButtonContext() {
  return useContext(ButtonContext);
}

export {
  ButtonContext,
  useButtonContext,
  type ButtonContextProps
}
