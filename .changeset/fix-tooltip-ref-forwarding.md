---
"@sprocketui-react/tooltip": minor
---

Fix tooltip positioning for components that do not forward refs. TooltipTrigger now detects whether the child accepts refs and falls back to a wrapper `<span style="display:contents">` when it does not, ensuring the tooltip can always measure the trigger position. Also updated all tooltip component JSDoc annotations to match the codebase code design conventions.
