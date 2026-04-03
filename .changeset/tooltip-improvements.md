---
"@sprocketui-react/tooltip": minor
---

feat: tooltip improvements

- Added `closeOnContentHover` prop to control whether tooltip stays open when hovering content (defaults to false)
- Tooltip.Trigger now throws an assertion error when child doesn't forward refs instead of silently rendering in the wrong position
- Improved hover state coordination between trigger and content
