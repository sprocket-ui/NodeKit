---
"@sprocketui-react/label": patch
---

Fix install failure caused by the internal `shared` workspace package leaking into the published `dependencies`. `shared` is now correctly listed as a `devDependency` (bundled at build time, not a runtime dependency), matching the other `@sprocketui-react/*` packages. Added `@necto/strings` to runtime dependencies to cover the transitive requirement used by `buildInternalIdentifier`.
