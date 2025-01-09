---
"@lightnet/library": minor
---

Breaking Change: Changes how translations are used.

Previously you would do something like this:

```js
const t = useTranslate(Astro.currentLocale)

const translatedString = t("key")
```

Now you do this:

```js
const translatedString = Astro.locals.i18n.t("key")
```
