---
"@lightnet/decap-admin": minor
"@lightnet/library": minor
---

Update Astro to version 5.

Fix your project by doing this:

- move `/src/content/config.ts` to `/src/content.config.ts`.
- update tsconfig.json to match the following:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- remove `src/env.d.ts`
- add `// @ts-check` on top of `astro.config.mjs`
