import type { MiddlewareHandler } from "astro"

import { useTranslate } from "./translate"

export const onRequest: MiddlewareHandler = (
  { locals, currentLocale },
  next,
) => {
  if (!locals.i18n) {
    locals.i18n = { t: useTranslate(currentLocale) }
  }
  return next()
}
