// biome-ignore-all lint/suspicious/noExplicitAny: Props records require any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { CSSProperties, ElementType, RefObject } from 'react';

/** Options for useTooltipContent hook. */
export interface UseTooltipContentOptions<T extends ElementType = 'div'> {
	/** The element type to render as. @default 'div' */
	elementType?: T;

	/** Shorthand for elementType. */
	as?: T;

	/** Placement of the tooltip relative to the trigger. @default 'top' */
	placement?: 'top' | 'bottom' | 'left' | 'right';

	/** Offset distance from the trigger in pixels. @default 6 */
	offset?: number;

	/** Duration of the enter/exit transition in ms. @default 150 */
	transitionDuration?: number;

	/** Ref to the trigger/reference element for popper positioning. */
	triggerRef?: RefObject<Element | null>;

	/** Ref to track if tooltip content is hovered (shared with trigger for close coordination). */
	isContentHoveredRef?: RefObject<boolean>;
}

/** Return value from useTooltipContent hook. */
export type UseTooltipContentReturn<T extends ElementType = 'div'> = Readonly<{
	/** Props to spread on the tooltip content element. */
	contentProps: Record<string, any>;

	/** The resolved element type. */
	elementType: T;

	/** Whether the tooltip content is hovered. */
	isHovered: boolean;

	/** Popper refs (setFloating). */
	refs: { setFloating: (node: HTMLElement | null) => void };

	/** Computed floating styles from popper. */
	floatingStyles: CSSProperties;

	/** The resolved placement after flip/shift. */
	finalPlacement: string;

	/** Returns props to spread on the floating element. */
	getFloatingProps: (userProps?: Record<string, any>) => Record<string, any>;

	/** Whether the tooltip is mounted (for transition). */
	isMounted: boolean;

	/** Whether popper has calculated the position. */
	isPositioned: boolean;

	/** Transition styles for enter/exit animation. */
	transitionStyles: CSSProperties;

	/** Callback ref for the arrow element (used by arrow middleware). */
	arrowRef: (node: HTMLDivElement | null) => void;

	/** Arrow x coordinate from arrow middleware. */
	arrowX?: number;

	/** Arrow y coordinate from arrow middleware. */
	arrowY?: number;
}>;
