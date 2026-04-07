---
'@sprocketui-react/tooltip': patch
---

Fix `Tooltip.Trigger` ref-forwarding guard to support React 19 plain function components (ref-as-prop), in addition to host elements and `forwardRef` components. This unblocks using `<Button>` (and any other Sprocket component) as a tooltip trigger.

Also align `Tooltip` export shape with the rest of the component family (`forwardRef` + `ForwardRefExoticComponent` + compound `Object.assign` with `Root`). Tooltip remains a pure context provider and renders no DOM element, matching Radix UI and React Aria Components.
