# @sprocketui-react/tooltip

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
