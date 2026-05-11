/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TOOLTIP_TRIGGER_DELAY, TOOLTIP_TRIGGER_COOLDOWN } from '../../constants';

import type {
	UseTooltipTriggerOptions,
	UseTooltipTriggerStateReturn
} from './useTooltipTrigger.types';

// Global tooltip registry — ensures only one tooltip is open at a time.
// Maps tooltip IDs to their hide functions.
const tooltips: Record<string, (immediate?: boolean) => void> = {};
let tooltipId = 0;
let globalWarmedUp = false;
let globalWarmUpTimeout: ReturnType<typeof setTimeout> | null = null;
let globalCooldownTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Hook for managing tooltip open/close state.
 * Handles warmup delays, cooldowns, and global tooltip coordination
 * to ensure only one tooltip is visible at a time.
 *
 * @param options - Configuration options for the trigger state.
 * @returns The tooltip state with open and close methods.
 */
export function useTooltipTriggerState(
	options: UseTooltipTriggerOptions
): UseTooltipTriggerStateReturn {
	const {
		isOpen: isOpenControlled,
		defaultOpen = false,
		onOpenChange,
		delay = TOOLTIP_TRIGGER_DELAY,
		closeDelay = TOOLTIP_TRIGGER_COOLDOWN
	} = options;

	const [openState, setOpenState] = useState(defaultOpen);
	const isControlled = isOpenControlled !== undefined;
	const isOpen = isControlled ? isOpenControlled : openState;

	const id = useMemo(() => `${++tooltipId}`, []);
	const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const closeCallback = useRef<() => void>(() => {});

	// Mirror of `isOpen` so callbacks can read the latest value without
	// re-creating themselves on every toggle.
	const isOpenRef = useRef(isOpen);
	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);

	const setOpen = useCallback(
		(value: boolean): void => {
			if (!isControlled) {
				setOpenState(value);
			}
			onOpenChange?.(value);
		},
		[isControlled, onOpenChange]
	);

	const open = useCallback(() => setOpen(true), [setOpen]);
	const close = useCallback(() => setOpen(false), [setOpen]);

	// Keep close callback ref up to date
	useEffect(() => {
		closeCallback.current = close;
	}, [close]);

	// Close all other open tooltips — ensures only one is visible
	const closeOpenTooltips = useCallback(() => {
		for (const tooltipEntryId in tooltips) {
			if (tooltipEntryId !== id) {
				tooltips[tooltipEntryId](true);
				delete tooltips[tooltipEntryId];
			}
		}
	}, [id]);

	const hideTooltip = useCallback((immediate?: boolean) => {
		if (immediate || closeDelay <= 0) {
			if (closeTimeout.current) {
				clearTimeout(closeTimeout.current);
			}
			closeTimeout.current = null;
			closeCallback.current();
		} else if (!closeTimeout.current) {
			closeTimeout.current = setTimeout(() => {
				closeTimeout.current = null;
				closeCallback.current();
			}, closeDelay);
		}

		if (globalWarmUpTimeout) {
			clearTimeout(globalWarmUpTimeout);
			globalWarmUpTimeout = null;
		}
		if (globalWarmedUp) {
			if (globalCooldownTimeout) {
				clearTimeout(globalCooldownTimeout);
			}
			globalCooldownTimeout = setTimeout(
				() => {
					delete tooltips[id];
					globalCooldownTimeout = null;
					globalWarmedUp = false;
				},
				Math.max(TOOLTIP_TRIGGER_COOLDOWN, closeDelay)
			);
		}
	}, [id, closeDelay]);

	const ensureTooltipEntry = useCallback(() => {
		tooltips[id] = hideTooltip;
	}, [id, hideTooltip]);

	const showTooltip = useCallback(() => {
		if (closeTimeout.current) {
			clearTimeout(closeTimeout.current);
		}
		closeTimeout.current = null;
		closeOpenTooltips();
		ensureTooltipEntry();
		globalWarmedUp = true;
		open();
		if (globalWarmUpTimeout) {
			clearTimeout(globalWarmUpTimeout);
			globalWarmUpTimeout = null;
		}
		if (globalCooldownTimeout) {
			clearTimeout(globalCooldownTimeout);
			globalCooldownTimeout = null;
		}
	}, [open, closeOpenTooltips, ensureTooltipEntry]);

	const warmupTooltip = useCallback(() => {
		closeOpenTooltips();
		ensureTooltipEntry();
		if (!isOpenRef.current && !globalWarmedUp) {
			if (globalWarmUpTimeout) {
				clearTimeout(globalWarmUpTimeout);
			}
			globalWarmUpTimeout = setTimeout(() => {
				globalWarmUpTimeout = null;
				globalWarmedUp = true;
				showTooltip();
			}, delay);
		} else if (!isOpenRef.current) {
			showTooltip();
		}
	}, [delay, closeOpenTooltips, ensureTooltipEntry, showTooltip]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (closeTimeout.current) {
				clearTimeout(closeTimeout.current);
			}
			if (tooltips[id]) {
				delete tooltips[id];
			}
		};
	}, [id]);

	const stateOpen = useCallback(
		(immediate?: boolean) => {
			if (!immediate && delay > 0 && !closeTimeout.current) {
				warmupTooltip();
			} else {
				showTooltip();
			}
		},
		[delay, warmupTooltip, showTooltip]
	);

	return useMemo(
		() => ({
			isOpen,
			open: stateOpen,
			close: hideTooltip
		}),
		[isOpen, stateOpen, hideTooltip]
	);
}
