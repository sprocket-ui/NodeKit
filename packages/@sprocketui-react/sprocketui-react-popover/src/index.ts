/**
 * Copyright (c) Corinvo, LLC. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Root component with compound component pattern
export { Popover } from './components/Popover';

// Individual component exports
export { PopoverTrigger } from './components/PopoverTrigger';
export { PopoverContent } from './components/PopoverContent';
export { PopoverPortal } from './components/PopoverPortal';

// Type exports
export type { PopoverProps, PopoverState } from './components/Popover.types';
export type { PopoverTriggerProps } from './components/PopoverTrigger.types';
export type { PopoverContentProps } from './components/PopoverContent.types';
export type { PopoverPortalProps } from './components/PopoverPortal.types';

// Context exports
export { usePopoverContext } from './contexts/usePopoverContext';
export type { PopoverContextValue } from './contexts/PopoverContext';

// Hook exports
export { usePopover } from './hooks/usePopover';
export type { UsePopoverProps, UsePopoverReturn } from './hooks/usePopover.types';
