/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  Placement,
  Strategy,
  Middleware,
  Padding,
  Boundary,
  RootBoundary,
  ElementContext,
  OffsetOptions,
  ShiftOptions,
  FlipOptions,
  ArrowOptions,
  HideOptions,
  SizeOptions,
  InlineOptions,
  AutoUpdateOptions
} from '@floating-ui/react';

/**
 * Popover placement position.
 */
export type PopoverPlacement = Placement;

/**
 * Popover positioning strategy.
 */
export type PopoverStrategy = Strategy;

/**
 * Popover middleware for positioning behavior.
 */
export type PopoverMiddleware = Middleware;

/**
 * Padding around boundary edges.
 */
export type PopoverPadding = Padding;

/**
 * Boundary element(s) for overflow detection.
 */
export type PopoverBoundary = Boundary;

/**
 * Root boundary for overflow detection.
 */
export type PopoverRootBoundary = RootBoundary;

/**
 * Element context for overflow detection.
 */
export type PopoverElementContext = ElementContext;

/**
 * Offset options for popover positioning.
 */
export type PopoverOffsetOptions = OffsetOptions;

/**
 * Shift options for popover positioning.
 */
export type PopoverShiftOptions = ShiftOptions;

/**
 * Flip options for popover positioning.
 */
export type PopoverFlipOptions = FlipOptions;

/**
 * Arrow options for popover positioning.
 */
export type PopoverArrowOptions = ArrowOptions;

/**
 * Hide options for popover positioning.
 */
export type PopoverHideOptions = HideOptions;

/**
 * Size options for popover positioning.
 */
export type PopoverSizeOptions = SizeOptions;

/**
 * Inline options for popover positioning.
 */
export type PopoverInlineOptions = InlineOptions;

/**
 * Auto update options for popover positioning.
 */
export type PopoverAutoUpdateOptions = AutoUpdateOptions;
