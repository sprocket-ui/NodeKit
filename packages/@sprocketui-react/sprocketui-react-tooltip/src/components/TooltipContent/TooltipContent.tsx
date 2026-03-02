/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { mergeProps } from '@necto/mergers';
import { useContext, useMemo, forwardRef } from 'react';
import { useRenderer } from '@necto-react/hooks';
import { buildInternalIdentifier } from 'shared';
import { PopperPortal } from '@necto-react/popper';
import { Primitive } from '@necto-react/components';

import { TOOLTIP_CONTENT_NAME } from '../../constants';
import { TooltipContext, TooltipArrowContext } from '../../contexts';
import { useTooltipContent } from '../../hooks/useTooltipContent';

import type {
  ElementType,
  ForwardedRef,
  ReactElement,
  RefAttributes,
  ForwardRefExoticComponent
} from 'react';
import type { TooltipContentProps } from './TooltipContent.types';
import type { UseRendererReturn } from '@necto-react/hooks';

/**
 * @internal
 * Internal render function for the TooltipContent component.
 */
function TooltipContentFn(
  props: TooltipContentProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement | null {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('TooltipContent must be used within a <Tooltip> component.');
  }

  const { slot, ...restProps } = props;

  const {
    contentProps,
    elementType,
    isHovered,
    refs,
    floatingStyles,
    finalPlacement,
    getFloatingProps,
    transitionStyles
  } = useTooltipContent(restProps, context);

  const placementSide = (finalPlacement?.split('-')[0] as 'top' | 'bottom' | 'left' | 'right') ?? null;
  const arrowContextValue = useMemo(() => ({ placement: placementSide }), [placementSide]);

  const renderProps: UseRendererReturn = useRenderer({
    ...restProps,
    values: {
      placement: finalPlacement ?? null,
      isOpen: context.isOpen,
      isHovered
    },
    defaultClassName: buildInternalIdentifier({
      component: TOOLTIP_CONTENT_NAME
    }),
    style: (values) => ({
      ...(props.style instanceof Function ? props.style(values) : props.style)
    })
  });

  return (
    <PopperPortal>
      <Primitive
        ref={(node: HTMLElement | null): void => {
          refs.setFloating(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        as={elementType}
        {...renderProps}
        {...getFloatingProps()}
        {...mergeProps(contentProps)}
        id={context.tooltipId}
        style={{
          ...floatingStyles,
          ...transitionStyles,
          ...(renderProps.style as any)
        }}
        data-placement={finalPlacement ?? undefined}
        slot={slot || undefined}
      >
        <TooltipArrowContext.Provider value={arrowContextValue}>
          {renderProps.children}
        </TooltipArrowContext.Provider>
      </Primitive>
    </PopperPortal>
  );
}

/**
 * The floating content of a Tooltip.
 * Renders the tooltip overlay with positioning, transitions, and accessibility.
 * Must be used inside a Tooltip (root) component.
 */
const TooltipContentForwardRef: ForwardRefExoticComponent<
  Omit<TooltipContentProps<ElementType>, 'ref'> & RefAttributes<HTMLElement>
> = forwardRef<HTMLElement, Omit<TooltipContentProps<ElementType>, 'ref'>>(
  (props: Omit<TooltipContentProps<ElementType>, 'ref'>, ref: ForwardedRef<HTMLElement>) =>
    TooltipContentFn(props as TooltipContentProps, ref)
);

TooltipContentForwardRef.displayName = TOOLTIP_CONTENT_NAME;

export const TooltipContent: typeof TooltipContentForwardRef & {
  Root: typeof TooltipContentForwardRef;
} = Object.assign(TooltipContentForwardRef, {
  Root: TooltipContentForwardRef
});
