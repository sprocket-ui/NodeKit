---
"@sprocketui-react/tooltip": minor
---

feat: overhaul tooltip component

- Arrow positioning via necto-popper arrow middleware for pixel-perfect placement on all sides
- Fixed hover race condition when switching between tooltips quickly using global tooltip registry
- Added `closeOnContentHover` prop to control whether tooltip stays open when hovering its content (defaults to false)
- Code style aligned with tabs package pattern (displayName, assert, minimal JSDoc)
- Fixed transition animation from top-left corner on first hover
