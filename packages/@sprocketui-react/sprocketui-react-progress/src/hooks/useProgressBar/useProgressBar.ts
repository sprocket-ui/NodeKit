/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defu } from 'defu';
import { HTMLElements } from '@necto/dom';
import { mergeProps } from '@necto/mergers';
import { clamp, percentage } from '@necto/math';
import { useLabel } from '@sprocketui-react/label';
import { filterDOMProps } from '@necto-react/helpers';
import { ANCHOR_ELEMENT_PROPS, ALLOWED_EXTERNAL_PROPS } from 'shared';

import { useState, useEffect } from 'react';

import type { RefObject } from 'react';
import type { Percentage } from '@necto/math';
import type { UseProgressBarOptions, UseProgressBarReturn } from './useProgressBar.types';

export function useProgressBar(
  props: UseProgressBarOptions,
  ref: RefObject<any>
): UseProgressBarReturn {
  const {
    value,
    minValue,
    maxValue,
    formatOptions,
    isIndeterminate,
    label: providedLabel
  } = defu(props, {
    value: 0,
    minValue: 0,
    maxValue: 100,
    formatOptions: new Intl.NumberFormat('en-US', {
      style: 'percent'
    })
  });

  let { labelProps, fieldProps } = useLabel({
    elementType: HTMLElements.Span
  }, ref);

  const hungTimeout = props.hungTimeout ?? 5000;

  const clampedValue: number = clamp(value, minValue, maxValue);
  const percent: Percentage = percentage((value - minValue) / (maxValue - minValue));

  const [isHung, setIsHung] = useState(false);

  useEffect(() => {
    setIsHung(false);

    if (percent >= 1 || isIndeterminate) return;

    const timer = setTimeout(() => setIsHung(true), hungTimeout);
    return () => clearTimeout(timer);
  }, [percent, isIndeterminate, hungTimeout]);

  let label: any = providedLabel;
  if (!isIndeterminate && !label) {
    const resolvedOptions: Intl.ResolvedNumberFormatOptions = formatOptions.resolvedOptions();
    const valueToFormat: number = resolvedOptions.style === 'percent'
      ? percent
      : clampedValue;

    label = formatOptions.format(valueToFormat as number);
  }

  const sprocketState: string[] = [];
  if (isIndeterminate) sprocketState.push('indeterminate');
  if (isHung) sprocketState.push('hung');

  let additionalProps: Record<string, unknown> = {
    role: 'progressbar',
    'aria-valuemin': minValue,
    'aria-valuemax': maxValue,
    'aria-valuenow': isIndeterminate ? undefined : clampedValue,
    'aria-valuetext': isIndeterminate ? undefined : label as string,
    'data-indeterminate': isIndeterminate ? 'true' : undefined,
    'data-hung': isHung ? 'true' : undefined,
    'data-sprocket-state': sprocketState.length > 0 ? sprocketState.join(' ') : undefined
  }

  const progressBarProps: Record<string, any> = mergeProps(
    fieldProps,
    filterDOMProps(props, {
      allowLabelableProps: true,
      allowedLabelableProps: new Set([]),
      allowedLinkProps: new Set(ANCHOR_ELEMENT_PROPS),
      extraAllowedProps: new Set(ALLOWED_EXTERNAL_PROPS)
    })
  );

  return {
    labelProps,
    progressBarProps: mergeProps(progressBarProps, additionalProps),
    percentage: percent,
    isIndeterminate: isIndeterminate ?? false,
    isHung
  } satisfies UseProgressBarReturn;
}