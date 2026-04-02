/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps } from '@necto/mergers';
import { useContext, cloneElement, useCallback, isValidElement } from 'react';

import { TooltipContext } from '../../contexts';

import type { RefObject, ReactElement } from 'react';
import type { TooltipContextValue } from '../../contexts';
import type { TooltipTriggerProps } from './TooltipTrigger.types';

/**
 * @internal
 * Internal render function for the TooltipTrigger component. Handles context consumption,
 * ref forwarding detection, and prop merging for the trigger element.
 * Not intended for public use; use the exported TooltipTrigger component instead.
 *
 * @param {TooltipTriggerProps} props - The props for the TooltipTrigger component.
 * @returns {ReactElement} The rendered trigger element.
 */
function TooltipTriggerFn(props: TooltipTriggerProps): ReactElement {
	const { children } = props;
	const context: TooltipContextValue | null = useContext(TooltipContext);

	const triggerRef = context?.triggerRef as RefObject<Element | null> | undefined;

	const setRef = useCallback(
		(node: Element | null) => {
			if (triggerRef && typeof triggerRef === 'object') {
				(triggerRef as { current: Element | null }).current = node;
			}
		},
		[triggerRef]
	);

	if (!context) {
		return children;
	}

	const { triggerProps } = context;

	const mergedProps = mergeProps(children.props as Record<string, unknown>, triggerProps);

	const acceptsRef: boolean =
		isValidElement(children) &&
		(typeof children.type === 'string' ||
			(typeof children.type === 'object' && children.type !== null && '$$typeof' in children.type));

	if (acceptsRef) {
		return cloneElement(children, mergeProps(mergedProps, { ref: setRef }));
	}

	return (
		<span ref={setRef} {...triggerProps} style={{ display: 'contents' }}>
			{children}
		</span>
	);
}

/**
 * The public TooltipTrigger component for Sprocket UI.
 * Wraps a single child element and merges hover, focus, and accessibility
 * props from the parent Tooltip context. If the child does not forward refs,
 * a wrapper span with display:contents is used for tooltip positioning.
 *
 * @param {TooltipTriggerProps} props - The props for the TooltipTrigger component.
 * @returns {ReactElement} The rendered trigger element.
 */
export const TooltipTrigger: typeof TooltipTriggerFn & {
	Root: typeof TooltipTriggerFn;
} = Object.assign(TooltipTriggerFn, {
	Root: TooltipTriggerFn
});
