# @sprocketui-react/tooltip

## 1.5.3

### Patch Changes

- Internal refactor — removed the internal `shared` workspace package and distributed its two responsibilities to more appropriate homes:

  - `ANCHOR_ELEMENT_PROPS` (React-cased anchor attributes) now comes from `@necto/constants` as `ANCHOR.PROPS` — centralized with other web platform data, auto-updates with spec
  - `ALLOWED_EXTERNAL_PROPS` is now per-component — each hook owns its own scoped list (`useButton`, `useInput`, `useLabel`, `useProgressBar`). Labels no longer expose form-submission attrs, progress bars no longer expose `value`, etc. — each forwards only the attributes it semantically supports
  - `ALLOWED_INPUT_LABELABLE_PROPS` moved into `@sprocketui-react/input`'s own constants
  - `buildInternalIdentifier` helper replaced by a 1-line template: `` `__sprocket:=[${NAME.toLowerCase()}]` `` — no need for a utility to wrap one native method call
  - `ALLOWED_BUTTON_LABELABLE_PROPS` was unused and has been deleted

  Also migrated from `@necto-react/helpers` (deprecated, dissolved in `@necto-react/hooks@2.17.0`) to `@necto/dom`'s `filterDOMProps`, with the option rename `extraAllowedProps` → `additionalAllowedProps`.

  Generated class names and forwarded DOM props are byte-for-byte identical to the previous release — this is an internal cleanup with no public API change. No action required from consumers.

- Eliminate the render cascade in Tooltip context propagation.

  Previously, every Tooltip re-render produced a fresh `contextValue` object — even when nothing meaningful changed — which forced every `Tooltip.Trigger` and `Tooltip.Content` consumer to re-render. The cascade compounded across pages with multiple tooltips: hovering one button could trigger renders in unrelated tooltip components on the same page, and parent re-renders propagated through every tooltip in the tree.

  The root cause sat in three places, fixed together because each layer's instability invalidated memoization at the layer above:

  - **`useTooltipTriggerState`** — the returned `state` object was a fresh literal each render, with `hideTooltip`, `showTooltip`, and `warmupTooltip` declared as plain functions (new references every render). Internal callbacks are now wrapped in `useCallback`, the returned object in `useMemo`, and `isOpen` is mirrored to a ref so warmup logic doesn't have to invalidate on every toggle. `state.open` and `state.close` are now stable references across renders.

  - **`useTooltipTrigger`** — `triggerProps` was rebuilt every render via `mergeProps(...)`, and the inline `onPressStart` arrow function had a fresh identity each render. Both are now memoized; the returned `{ triggerProps, tooltipProps }` is wrapped in `useMemo`.

  - **`Tooltip.tsx`** — `contextValue` was a fresh object literal each render. Now wrapped in `useMemo` keyed on its actual inputs. Effective only because the upstream hooks now provide stable references for `state.open`, `state.close`, and `triggerProps`.

  No API changes. Same component props, same hook return shapes, same runtime behavior (warmup delays, escape-key handling, single-tooltip-at-a-time global coordination, focus tracking). Consumers see fewer re-renders only.

## 1.5.2

### Patch Changes

- 5816807: Fix `Tooltip.Trigger` ref-forwarding guard to support React 19 plain function components (ref-as-prop), in addition to host elements and `forwardRef` components. This unblocks using `<Button>` (and any other Sprocket component) as a tooltip trigger.

  Also align `Tooltip` export shape with the rest of the component family (`forwardRef` + `ForwardRefExoticComponent` + compound `Object.assign` with `Root`). Tooltip remains a pure context provider and renders no DOM element, matching Radix UI and React Aria Components.

## 1.5.1

### Patch Changes

- 4c47991: refactor: align tooltip code style with tabs package patterns

  - Standardized JSDoc comments across all files
  - Organized imports following external → local → types pattern
  - Converted inline comments to JSDoc format on type members
  - Updated component JSDoc to match tabs naming convention
  - Cleaned up constants and context file organization

## 1.5.0

### Minor Changes

- a5219ce: feat: tooltip improvements

  - Added `closeOnContentHover` prop to control whether tooltip stays open when hovering content (defaults to false)
  - Tooltip.Trigger now throws an assertion error when child doesn't forward refs instead of silently rendering in the wrong position
  - Improved hover state coordination between trigger and content

## 1.4.0

### Minor Changes

- 8993760: feat: overhaul tooltip component

  - Arrow positioning via necto-popper arrow middleware for pixel-perfect placement on all sides
  - Fixed hover race condition when switching between tooltips quickly using global tooltip registry
  - Added `closeOnContentHover` prop to control whether tooltip stays open when hovering its content (defaults to false)
  - Code style aligned with tabs package pattern (displayName, assert, minimal JSDoc)
  - Fixed transition animation from top-left corner on first hover

### Patch Changes

- 8993760: Update necto dependencies to latest versions
- Updated dependencies [8993760]
  - @sprocketui-types/tooltip@1.2.4

## 1.3.0

### Minor Changes

- b20fcf4: Fix tooltip positioning for components that do not forward refs. TooltipTrigger now detects whether the child accepts refs and falls back to a wrapper `<span style="display:contents">` when it does not, ensuring the tooltip can always measure the trigger position. Also updated all tooltip component JSDoc annotations to match the codebase code design conventions.

## 1.2.5

### Patch Changes

- 0f09991: Update all `@necto/*` and `@necto-react/*` dependencies to latest versions. Includes SSR compatibility fix from `@necto/dom@1.7.3` which guards all `document` and `window` references for server-side rendering environments.
- Updated dependencies [0f09991]
  - @sprocketui-types/tooltip@1.2.3

## 1.2.4

### Patch Changes

- be77c49: Update necto dependencies to latest versions
- Updated dependencies [be77c49]
  - @sprocketui-types/tooltip@1.2.2

## 1.2.3

### Patch Changes

- c46d352: Update necto dependencies to latest versions
- Updated dependencies [c46d352]
  - @sprocketui-types/tooltip@1.2.1

## 1.2.2

### Patch Changes

- Replaced React useState with useLocalState from @necto-react/state

## 1.2.0

### Minor Changes

- 727504e: Added new Tooltips Package

## 1.1.0

### Minor Changes

- 7939a4e: Added minor bump to all pakcages

### Patch Changes

- Updated dependencies [7939a4e]
  - @sprocketui-types/tooltip@1.1.0
