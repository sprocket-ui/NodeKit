/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { defu } from 'defu';
import { mergeProps } from '@necto/mergers';
import { useState, useCallback, useMemo } from 'react';
import { useId, useAriaProps } from '@necto-react/hooks';

import { tabsIds } from '../../utils';
import { DEFAULT_TAB_TAG } from '../../constants';

import type { TabsState } from '../../types';
import type { UseTabListOptions, UseTabListReturn } from './useTabList.types';
import type { AriaAttributes, Key, KeyboardEvent, RefObject, ElementType } from 'react';

/**
 * Provides behavior and accessibility for a tab list.
 */
export function useTabList<T extends ElementType = typeof DEFAULT_TAB_TAG>(
  options: UseTabListOptions<T>,
  ref: RefObject<HTMLElement | null>
): UseTabListReturn<T> {
  const {
    defaultSelectedValue,
    orientation,
    activationMode,
    isDisabled,
    disabledValues,
    elementType,

    // Callbacks
    onSelectionChange,

    selectedValue: controlledValue,
  } = defu(options, {
    orientation: 'horizontal' as const,
    activationMode: 'automatic' as const,
    isDisabled: false,
    disabledValues: [] as Iterable<Key>,
    elementType: (options.as ?? DEFAULT_TAB_TAG) as T
  });

  const tabsId: string = useId({});
  const [internalValue, setInternalValue] = useState<Key | null>(defaultSelectedValue ?? null);

  const selectedValue: Key | null = controlledValue ?? internalValue;
  const disabledSet: Set<Key> = useMemo((): Set<Key> => new Set(disabledValues), [disabledValues]);

  const setSelectedValue = useCallback((value: Key): void => {
    if (controlledValue === undefined) setInternalValue(value);
    onSelectionChange?.(value);
  }, [controlledValue, onSelectionChange]);

  const isValueDisabled = useCallback(
    (value: Key): boolean => isDisabled || disabledSet.has(value),
    [isDisabled, disabledSet]
  );

  const state: TabsState = useMemo((): TabsState => {
    const obj: TabsState = {
      id: tabsId,
      selectedValue,
      setSelectedValue,
      orientation,
      activationMode,
      isDisabled,
      isValueDisabled
    };

    tabsIds.set(obj, tabsId);
    return obj;
  }, [tabsId, selectedValue, setSelectedValue, orientation, activationMode, isDisabled, isValueDisabled]);

  const ariaProps: AriaAttributes = useAriaProps({
    label: options['aria-label'],
    labelledBy: options['aria-labelledby'],
    describedBy: options['aria-describedby']
  });

  const onKeyDown = useCallback((e: KeyboardEvent): void => {
    if (isDisabled) return;

    const tabs = ref.current?.querySelectorAll<HTMLElement>('[role="tab"]:not([aria-disabled="true"])');
    if (!tabs?.length) return;

    const list: HTMLElement[] = Array.from(tabs);
    const current: number = list.findIndex((t): boolean => t === document.activeElement);
    if (current === -1) return;

    const len: number = list.length;
    const isHorizontal: boolean = orientation === 'horizontal';

    const keyMap: Record<string, number | undefined> = {
      [isHorizontal ? 'ArrowLeft' : 'ArrowUp']: (current - 1 + len) % len,
      [isHorizontal ? 'ArrowRight' : 'ArrowDown']: (current + 1) % len,
      Home: 0,
      End: len - 1
    };

    const nextIndex: number | undefined = keyMap[e.key];
    if (nextIndex === undefined) return;

    e.preventDefault();
    const nextTab: HTMLElement = list[nextIndex];
    nextTab.focus();

    if (activationMode === 'automatic' && nextTab.dataset.value) {
      setSelectedValue(nextTab.dataset.value);
    }
  }, [ref, isDisabled, orientation, activationMode, setSelectedValue]);

  return {
    state,
    elementType: elementType as T,
    tabListProps: mergeProps(
      { role: 'tablist', 'aria-orientation': orientation, onKeyDown },
      ariaProps
    )
  };
}
