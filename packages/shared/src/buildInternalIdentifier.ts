/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { kebabCase } from '@necto/strings';

// Constants for random ID generation
const UNIQUE_ID_LENGTH = 6; // 8 - 2 (slice offset)
const OBSCURE_ID_LENGTH = 14; // 16 - 2 (slice offset)

// Generate random ID for unique/obscure identifiers
function generateRandomId(length: number): string {
  return Math.random().toString(36).slice(2, 2 + length);
}

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
  prefix = '__sprocket:=[',
  component,
  variant,
  state,
  unique,
  obscure
}: BuildInternalIdentifierOptions) {
  const trimmedComponent = component?.trim();
  if (!trimmedComponent) throw new Error('Component context is required!');

  // Pre-allocate array with estimated capacity for better performance
  const capacity = 1 + (variant ? 1 : 0) + (state?.length ?? 0) + (unique ? 1 : 0) + (obscure ? 1 : 0);
  const parts: string[] = new Array(capacity);
  let index = 0;

  parts[index++] = prefix + kebabCase(trimmedComponent, false) + ']';

  if (variant) parts[index++] = kebabCase(variant, false);
  if (state?.length) {
    for (const s of state) parts[index++] = kebabCase(s, false);
  }
  if (unique) parts[index++] = generateRandomId(UNIQUE_ID_LENGTH);
  if (obscure) parts[index++] = generateRandomId(OBSCURE_ID_LENGTH);

  return parts.join('--');
}

export { buildInternalIdentifier, type BuildInternalIdentifierOptions };
