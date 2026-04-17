---
'@sprocketui/react': patch
---

Remove unused `shared` workspace dependency from `devDependencies`. `@sprocketui/react` does not import from `shared`, so the entry was dead weight.
