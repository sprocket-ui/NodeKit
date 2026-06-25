# @sprocketui-react/input

## 1.1.4

### Patch Changes

- Internal refactor — removed the internal `shared` workspace package and distributed its two responsibilities to more appropriate homes:

  - `ANCHOR_ELEMENT_PROPS` (React-cased anchor attributes) now comes from `@necto/constants` as `ANCHOR.PROPS` — centralized with other web platform data, auto-updates with spec
  - `ALLOWED_EXTERNAL_PROPS` is now per-component — each hook owns its own scoped list (`useButton`, `useInput`, `useLabel`, `useProgressBar`). Labels no longer expose form-submission attrs, progress bars no longer expose `value`, etc. — each forwards only the attributes it semantically supports
  - `ALLOWED_INPUT_LABELABLE_PROPS` moved into `@sprocketui-react/input`'s own constants
  - `buildInternalIdentifier` helper replaced by a 1-line template: `` `__sprocket:=[${NAME.toLowerCase()}]` `` — no need for a utility to wrap one native method call
  - `ALLOWED_BUTTON_LABELABLE_PROPS` was unused and has been deleted

  Also migrated from `@necto-react/helpers` (deprecated, dissolved in `@necto-react/hooks@2.17.0`) to `@necto/dom`'s `filterDOMProps`, with the option rename `extraAllowedProps` → `additionalAllowedProps`.

  Generated class names and forwarded DOM props are byte-for-byte identical to the previous release — this is an internal cleanup with no public API change. No action required from consumers.

## 1.1.3

### Patch Changes

- 8993760: Update necto dependencies to latest versions

## 1.1.2

### Patch Changes

- 0f09991: Update all `@necto/*` and `@necto-react/*` dependencies to latest versions. Includes SSR compatibility fix from `@necto/dom@1.7.3` which guards all `document` and `window` references for server-side rendering environments.

## 1.1.1

### Patch Changes

- Replaced React useState with useLocalState from @necto-react/state

## 1.1.0

### Minor Changes

- 7939a4e: Added minor bump to all pakcages

### Patch Changes

- Updated dependencies [7939a4e]
  - @sprocketui-types/input@1.1.0
