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
import { useLocalState } from '@necto-react/state';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useId, useAriaProps, useCollectionNavigation } from '@necto-react/hooks';

import { tabsIds } from '../../utils';
import { DEFAULT_TAB_TAG } from '../../constants';

import type { TabsState } from '../../types';
import type { SelectionManager } from '@necto-react/types';
import type { KeyboardDelegate } from '@necto-react/hooks';
import type { AriaAttributes, Key, RefObject, ElementType } from 'react';
import type { UseTabListOptions, UseTabListReturn } from './useTabList.types';

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

  const internalSelection = useLocalState<Key | null>(defaultSelectedValue ?? null);
  const focusedKeyState = useLocalState<Key | null>(null);

  const selectedValue: Key | null = controlledValue ?? internalSelection.value;
  const disabledSet: Set<Key> = useMemo((): Set<Key> => new Set(disabledValues), [disabledValues]);

  const setSelectedValue = useCallback((value: Key): void => {
    if (controlledValue === undefined) internalSelection.set(value);
    onSelectionChange?.(value);
  }, [controlledValue, onSelectionChange]);

  const isValueDisabled = useCallback(
    (value: Key): boolean => isDisabled || disabledSet.has(value),
    [isDisabled, disabledSet]
  );

  const focusedKeyRef = useRef<Key | null>(null);
  const isFocusedRef = useRef(false);

  const setFocusedKey = useCallback((key: Key | null): void => {
    focusedKeyRef.current = key;
    focusedKeyState.set(key);
  }, []);

  const selectionManager: SelectionManager = useMemo((): SelectionManager => ({
    get focusedKey(): (string | number) | null { return focusedKeyRef.current as (string | number) | null; },
    setFocusedKey: (key): void => setFocusedKey(key),
    get isFocused(): boolean { return isFocusedRef.current; },
    setFocused: (val): void => { isFocusedRef.current = val; },
    selectedKeys: selectedValue != null ? new Set<string | number>([selectedValue as string | number]) : new Set<string | number>(),
    selectionMode: 'single',
    firstSelectedKey: selectedValue != null ? selectedValue as string | number : null,
    lastSelectedKey: selectedValue != null ? selectedValue as string | number : null,
    replaceSelection: (key): void => setSelectedValue(key),
    toggleSelection: (key): void => setSelectedValue(key),
    extendSelection(): void {},
    selectAll(): void {},
    clearSelection(): void {},
    isSelected: (key): boolean => key === selectedValue,
    isDisabled: (key): boolean => isDisabled || disabledSet.has(key),
    canSelectItem: (key): boolean => !isDisabled && !disabledSet.has(key),
  }), [selectedValue, isDisabled, disabledSet, setSelectedValue, setFocusedKey]);

  const keyboardDelegate: KeyboardDelegate = useMemo((): KeyboardDelegate => {
    const getEnabledKeys = (): string[] => {
      if (!ref.current) return [];
      const els = ref.current.querySelectorAll<HTMLElement>('[data-key]');
      return Array.from(els)
        .filter((el): boolean => el.getAttribute('aria-disabled') !== 'true')
        .map((el): string => el.dataset.key!);
    };

    const adjacent = (key: string | number, dir: 1 | -1): (string | number) | null => {
      const keys = getEnabledKeys();
      return keys[keys.indexOf(String(key)) + dir] ?? null;
    };

    return {
      getKeyRightOf: (key): (string | number) | null => adjacent(key, 1),
      getKeyLeftOf: (key): (string | number) | null => adjacent(key, -1),
      getKeyBelow: (key): (string | number) | null => adjacent(key, 1),
      getKeyAbove: (key): (string | number) | null => adjacent(key, -1),
      getFirstKey: (): (string | number) | null => getEnabledKeys()[0] ?? null,
      getLastKey: (): (string | number) | null => { const k = getEnabledKeys(); return k[k.length - 1] ?? null; },
    };
  }, [ref]);

  const { collectionProps } = useCollectionNavigation({
    ref,
    selectionManager,
    keyboardDelegate,
    selectOnFocus: activationMode === 'automatic',
    shouldFocusWrap: true,
    disallowTypeAhead: true,
    disallowSelectAll: true,
    disallowEmptySelection: true,
    orientation,
  });

  useEffect((): void => {
    if (focusedKeyState.value == null || !ref.current) return;
    const el = ref.current.querySelector<HTMLElement>(`[data-key="${CSS.escape(String(focusedKeyState.value))}"]`);
    if (el && document.activeElement !== el) el.focus();
  }, [focusedKeyState.value, ref]);

  const tabsState: TabsState = useMemo((): TabsState => {
    const obj: TabsState = {
      id: tabsId,
      selectedValue,
      setSelectedValue,
      focusedKey: focusedKeyState.value,
      setFocusedKey,
      orientation,
      activationMode,
      isDisabled,
      isValueDisabled
    };

    tabsIds.set(obj, tabsId);
    return obj;
  }, [tabsId, selectedValue, setSelectedValue, focusedKeyState.value, setFocusedKey, orientation, activationMode, isDisabled, isValueDisabled]);

  const ariaProps: AriaAttributes = useAriaProps({
    label: options['aria-label'],
    labelledBy: options['aria-labelledby'],
    describedBy: options['aria-describedby']
  });

  return {
    state: tabsState,
    elementType: elementType as T,
    tabListProps: mergeProps(
      { role: 'tablist', 'aria-orientation': orientation },
      collectionProps,
      ariaProps
    )
  };
}
