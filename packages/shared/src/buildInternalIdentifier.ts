/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { kebabCase } from '@necto/strings';

interface BuildInternalIdentifierOptions {
  // Prefix to use for ID.
  prefix?: string;

  // The name of the component that the ID is for.
  component: string;

  // Variant of component.
  variant?: string;

  // State of the component for the ID.
  state?: string[];

  // Wether to make it unique across all of the DOM.
  unique?: boolean;

  // Add hash to the ID.
  obscure?: boolean;
}

function buildInternalIdentifier({
  prefix = ':sprocket:=',
  component,
  variant,
  state,
  unique,
  obscure
}: BuildInternalIdentifierOptions) {
  if (!component) throw new Error('Component context is required!');

  const parts: string[] = [prefix + kebabCase(component, false)];

  if (variant) parts.push(kebabCase(variant, false));
  if (Array.isArray(state) && state.length)
    parts.push(...state.map((s) => kebabCase(s, false)));
  if (unique) parts.push(Math.random().toString(36).slice(2, 8));
  if (obscure) parts.push(Math.random().toString(36).slice(2, 16));

  return parts.join('--');
}

export { buildInternalIdentifier, type BuildInternalIdentifierOptions };
