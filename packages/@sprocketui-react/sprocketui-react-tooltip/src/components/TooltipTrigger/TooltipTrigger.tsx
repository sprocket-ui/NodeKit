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

import { TOOLTIP_TRIGGER_NAME } from '../../constants';
import { TooltipContext } from '../../contexts';

import type { RefObject, ReactElement } from 'react';
import type { TooltipContextValue } from '../../contexts';
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
		<span ref={setRef} {...triggerProps} style={{ display: 'inline' }}>
			{children}
		</span>
	);
}

/**
 * The public TooltipTrigger component for Sprocket UI.
 */
export const TooltipTrigger: typeof TooltipTriggerFn & {
	displayName?: string;
	Root: typeof TooltipTriggerFn;
} = Object.assign(TooltipTriggerFn, {
	Root: TooltipTriggerFn
});

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;
