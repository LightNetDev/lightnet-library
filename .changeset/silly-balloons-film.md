---
"@lightnet/library": minor
---

Improve validation of label properties.

This adds more validation to `label` properties. They all support fixed strings. Currently we are not able to identify if a label value is a translation key or a fixed string. With this release, labels that start with `custom.` or `ln.` prefix will be treated as translation keys. They will fail the build if no translation is found.

Prefixing custom translation strings with `custom.` is non mandatory but recommended as it improves validation.

This is changed:

- rename translate parameter `fallbackToKey` to `allowFixedStrings`.
- change behavior of the translate function. If `allowFixedStrings` is set to `true`, return the translation key if no translation is found. But fail if the key starts with `custom.` or `ln.` prefix.
- change example to reflect the new convention of prefixing custom translation keys with `custom.`.
