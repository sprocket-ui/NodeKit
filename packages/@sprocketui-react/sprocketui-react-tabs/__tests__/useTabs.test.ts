/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTabs } from '@sprocketui-react/tabs';

describe('Sprocket UI - useTabs', () => {
  test('returns tabsProps with a generated id and default orientation data attribute', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.tabsProps.id).toBeTruthy();
    expect(result.current.tabsProps['data-orientation']).toBe('horizontal');
  });

  test('uses provided id when passed', () => {
    const { result } = renderHook(() => useTabs({ id: 'my-tabs' }));
    expect(result.current.tabsProps.id).toBe('my-tabs');
  });

  test('sets data-orientation=vertical when orientation is vertical', () => {
    const { result } = renderHook(() => useTabs({ orientation: 'vertical' }));
    expect(result.current.tabsProps['data-orientation']).toBe('vertical');
  });

  test('elementType defaults to div', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.elementType).toBe('div');
  });

  test('elementType honors explicit elementType prop', () => {
    const { result } = renderHook(() => useTabs({ elementType: 'section' }));
    expect(result.current.elementType).toBe('section');
  });

  test('elementType honors `as` shorthand', () => {
    const { result } = renderHook(() => useTabs({ as: 'nav' }));
    expect(result.current.elementType).toBe('nav');
  });

  test('contextValue contains the passed selection config', () => {
    const onSelectionChange = () => {};
    const { result } = renderHook(() =>
      useTabs({
        selectedValue: 'a',
        defaultSelectedValue: 'b',
        disabledValues: ['c'],
        activationMode: 'manual',
        orientation: 'vertical',
        isDisabled: true,
        onSelectionChange
      })
    );

    expect(result.current.contextValue).toMatchObject({
      selectedValue: 'a',
      defaultSelectedValue: 'b',
      disabledValues: ['c'],
      activationMode: 'manual',
      orientation: 'vertical',
      isDisabled: true,
      onSelectionChange
    });
  });

  test('contextValue.activationMode defaults to "automatic"', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.contextValue.activationMode).toBe('automatic');
  });

  test('contextValue.isDisabled defaults to false', () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.contextValue.isDisabled).toBe(false);
  });
});
