import type { MiddlewareHandler } from "astro"
import config from "virtual:lightnet/config"

import { resolveDefaultLocale } from "./resolve-default-locale"
import { resolveLocales } from "./resolve-locales"
import { useTranslate } from "./translate"

export const onRequest: MiddlewareHandler = (
  { locals, currentLocale },
  next,
) => {
  if (!locals.i18n) {
    const t = useTranslate(currentLocale)
    const defaultLocale = resolveDefaultLocale(config)
    const locales = resolveLocales(config)
    locals.i18n = {
      t,
      currentLocale: currentLocale ?? defaultLocale,
      defaultLocale,
      locales,
    }
  }
  return next()
}
