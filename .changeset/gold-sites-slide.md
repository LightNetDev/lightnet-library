---
"@lightnet/decap-admin": minor
"lightnet": minor
---

# Update translation system

This update introduces major changes on our translation system.

Changes:

- Translations are now stored inside `.yml` files.
- Added i18next as our translation engine
- Translations now support a flat i18next syntax including (pluralization, contextualization, interpolation)
- **astro.config.mjs** `language` config has been changed:
  - renamed `isDefaultLocale` to `isDefaultUILanguage`
  - added `isUILanguage` option to set other interface languages. Before this would have been implied by a defined `translations` property.
  - removed `translations` property. Translations are automatically loaded from `src/translations/*.yml` files. Imports can be removed.
  - added `fallbackLanguages` property. Each language can now define a fallback chain.
- **Astro.locals.i18n.t** Removed `allowFixedStrings` option. We now allow fixed strings by default. `t()` will only fail if a translation key starts with `ln.` or `x.` and cannot be resolved.
- Added `en` as a fallback language for all translations. This means after all user configured fallbacks LightNet will try resolve the label using the english translations.
- Changed prefix for user defined translation keys from `custom.` to `x.`.
- Changed translation keys:
  - `ln.header.a11y.open-main-menu` renamed to `ln.header.open-main-menu`
  - `ln.header.a11y.select-language` renamed to `ln.header.select-language`
  - `ln.common.a11y.external-link` renamed to `ln.external-link`
  - `ln.common.category` renamed to `ln.category_one` (using i18next pluralization)
  - `ln.common.categories` renamed to `ln.category_other` (using i18next pluralization)
  - `ln.common.language` renamed to `ln.language_one` (using i18next pluralization)
  - `ln.common.languages` renamed to `ln.language_other` (using i18next pluralization)
  - `ln.common.type` renamed to `ln.type_one` (using i18next pluralization)
