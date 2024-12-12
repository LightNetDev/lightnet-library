---
"@lightnet/decap-admin": patch
"@lightnet/library": patch
---

Simplify config format.

This changes the structure of the language config. `locales`, `defaultLocale`, `translations` have been moved into
the `languages` array.

The redirecting `index.astro` on root level can now be removed.
