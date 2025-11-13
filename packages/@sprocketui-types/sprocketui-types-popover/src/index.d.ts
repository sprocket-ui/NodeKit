/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  PopoverPlacement,
  PopoverStrategy,
  PopoverMiddleware,
  PopoverPadding,
  PopoverBoundary,
  PopoverRootBoundary,
  PopoverElementContext,
  PopoverOffsetOptions,
  PopoverShiftOptions,
  PopoverFlipOptions,
  PopoverArrowOptions,
  PopoverSizeOptions,
  PopoverInlineOptions,
  PopoverAutoUpdateOptions
} from './floatingui';

/**
 * Popover positioning options.
 *
 * Configuration for how the popover should be positioned relative to its trigger.
 */
export interface PopoverOptions {
  // The placement of the popover relative to its trigger.
  placement?: PopoverPlacement;

  // The positioning strategy (absolute or fixed).
  strategy?: PopoverStrategy;

  // Array of middleware to modify positioning behavior.
  middleware?: Array<PopoverMiddleware | null | undefined | false>;

  // Offset from the trigger element (shorthand).
  offset?: number | PopoverOffsetOptions;

  // Whether the popover should flip to the opposite side when there's no space.
  flip?: boolean | PopoverFlipOptions;

  // Whether the popover should shift along the axis to stay in view.
  shift?: boolean | PopoverShiftOptions;

  // Padding around the boundary edges.
  containerPadding?: PopoverPadding;

  // Whether to hide the popover when the trigger is fully clipped.
  hideWhenDetached?: boolean;

  // Arrow positioning options.
  arrow?: PopoverArrowOptions;

  // Size adjustment options.
  size?: PopoverSizeOptions;

  // Inline positioning options.
  inline?: PopoverInlineOptions;

  // Auto update options for dynamic positioning.
  autoUpdate?: boolean | PopoverAutoUpdateOptions;

  // The boundary element(s) to detect overflow against.
  boundary?: PopoverBoundary;

  // The root boundary to detect overflow against.
  rootBoundary?: PopoverRootBoundary;

  // The element context to use for overflow detection.
  elementContext?: PopoverElementContext;
}

export type {
  PopoverPlacement,
  PopoverStrategy,
  PopoverMiddleware,
  PopoverPadding,
  PopoverBoundary,
  PopoverRootBoundary,
  PopoverElementContext,
  PopoverOffsetOptions,
  PopoverShiftOptions,
  PopoverFlipOptions,
  PopoverArrowOptions,
  PopoverSizeOptions,
  PopoverInlineOptions,
  PopoverAutoUpdateOptions
};