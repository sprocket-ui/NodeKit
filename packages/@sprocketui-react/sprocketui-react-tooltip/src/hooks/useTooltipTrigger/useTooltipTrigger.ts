// biome-ignore-all lint/suspicious/noExplicitAny: Ref and props require any.

/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps } from '@necto/mergers';
import { useHover, useFocusable, useId, getInteractionModality } from '@necto-react/hooks';
import { useEffect } from 'react';

import type { RefObject } from 'react';
import type { TooltipState } from '../../types';
import type { UseTooltipTriggerOptions, UseTooltipTriggerReturn } from './useTooltipTrigger.types';

/**
 * Hook for the TooltipTrigger component.
 * Handles hover, focus, and keyboard interactions for showing/hiding the tooltip.
 *
 * @param options - Configuration options for the trigger.
 * @param state - The tooltip open/close state.
 * @param ref - Ref to the trigger element.
 * @param isContentHoveredRef - Optional ref tracking content hover state.
 * @returns Props for the trigger element and tooltip element.
 */
export function useTooltipTrigger(
	options: UseTooltipTriggerOptions,
	state: TooltipState,
	ref: RefObject<any>,
	isContentHoveredRef?: RefObject<boolean>
): UseTooltipTriggerReturn {
	const { isDisabled = false, trigger = 'hover', shouldCloseOnPress = true } = options;

	const tooltipId: string = useId();

	const { hoverProps } = useHover({
		isDisabled,
		onHoverStart() {
			if (trigger === 'focus') {
				return;
			}

			state.open();
		},
		onHoverEnd() {
			if (trigger === 'focus') {
				return;
			}

			if (isContentHoveredRef?.current) {
				return;
			}
			state.close();
		}
	});

	const { focusableProps } = useFocusable(
		{
			isDisabled,
			onFocus() {
				if (getInteractionModality() !== 'pointer') {
					state.open(true);
				}
			},
			onBlur() {
				state.close(true);
			}
		} as any,
		ref
	);

	const onPressStart = (): void => {
		if (!shouldCloseOnPress) return;
		state.close(true);
	};

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent): void => {
			if (e.key === 'Escape' && state.isOpen) {
				e.stopPropagation();
				state.close(true);
			}
		};

		if (state.isOpen) {
			document.addEventListener('keydown', onKeyDown, true);
			return (): void => document.removeEventListener('keydown', onKeyDown, true);
		}
	}, [state]);

	return {
		triggerProps: mergeProps(focusableProps, hoverProps, {
			'aria-describedby': state.isOpen ? tooltipId : undefined,
			onPointerDown: onPressStart,
			onKeyDown: onPressStart
		}),
		tooltipProps: {
			id: tooltipId
		}
	};
}
