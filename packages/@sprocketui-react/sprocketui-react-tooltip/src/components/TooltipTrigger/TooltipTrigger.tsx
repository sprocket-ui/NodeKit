/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { assert } from '@necto/assert';
import { mergeProps } from '@necto/mergers';
import { useContext, cloneElement, useCallback, isValidElement } from 'react';

import { TooltipContext } from '../../contexts';
import { TOOLTIP_TRIGGER_NAME } from '../../constants';

import type { RefObject, ReactElement } from 'react';
import type { TooltipContextValue } from '../../contexts/TooltipContext';
import type { TooltipTriggerProps } from './TooltipTrigger.types';

/**
 * @internal
 * Internal render function for the TooltipTrigger component.
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

			if (node) {
				const rect: DOMRect = node.getBoundingClientRect();

				assert(
					rect.width > 0 || rect.height > 0,
					'[Sprocket UI] Tooltip.Trigger: The trigger element has no dimensions. This usually happens with "display:contents" or elements that don\'t render a box. The tooltip cannot be positioned correctly.'
				);
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

	assert(
		acceptsRef,
		'[Sprocket UI] Tooltip.Trigger requires its child to forward refs. Wrap your component in React.forwardRef() or use a native HTML element.'
	);

	return cloneElement(children, mergeProps(mergedProps, { ref: setRef }));
}

/**
 * A TooltipTrigger component for Sprocket UI.
 */
export const TooltipTrigger: typeof TooltipTriggerFn & {
	displayName?: string;
	Root: typeof TooltipTriggerFn;
} = Object.assign(TooltipTriggerFn, {
	Root: TooltipTriggerFn
});

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;
