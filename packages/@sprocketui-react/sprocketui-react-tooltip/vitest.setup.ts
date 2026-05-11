/*
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// biome-ignore-all assist/source/organizeImports: No need to sort imports.
// biome-ignore-all lint/suspicious/noExplicitAny: Explicit any is okay here.

// The previous TextEncoder/TextDecoder polyfill was a jsdom-specific workaround
// and is no longer needed now that tests run in real browsers via @vitest/browser.

// Stub getBoundingClientRect to return deterministic coords for tooltip
// positioning assertions. Real browsers compute actual layout, but tests that
// check positioning expect stable values.
if (typeof Element !== 'undefined') {
  Element.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 100,
      bottom: 30,
      width: 100,
      height: 30,
      toJSON(): DOMRect {
        return this;
      }
    } as DOMRect;
  };
}
