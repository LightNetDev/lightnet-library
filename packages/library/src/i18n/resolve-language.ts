import { AstroError } from "astro/errors"

import { ALL_LANGUAGES } from "./languages"
import type { TranslateFn } from "./translate"

const languages = Object.fromEntries(
  ALL_LANGUAGES.map((lang) => [lang.code, lang]),
)

export const resolveLanguage = (bcp47: string) => {
  const language = languages[bcp47]

  if (!language) {
    throw new AstroError(`There is no language definition for: ${bcp47}`)
  }
  return language
}

export const resolveTranslatedLanguage = (bcp47: string, t: TranslateFn) => {
  const language = resolveLanguage(bcp47)
  return {
    ...language,
    name: t(language.label, { fallbackToKey: true }),
  }
}
