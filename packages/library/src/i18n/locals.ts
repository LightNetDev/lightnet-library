import type { MiddlewareHandler } from "astro"

import {
  type TranslationKey,
  type TranslationOptions,
  useTranslate,
} from "./use-translate"

export const onRequest: MiddlewareHandler = (
  { locals, currentLocale },
  next,
) => {
  if (!locals.t) {
    locals.t = useTranslate(currentLocale)
  }
  return next()
}

export type I18nT = (
  key: TranslationKey,
  options?: TranslationOptions,
) => string
