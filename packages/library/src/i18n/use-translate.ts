import { AstroError } from "astro/errors"
import config from "virtual:lightnet/config"

import { resolveDefaultLocale } from "./resolve-default-locale"
import de from "./translations/de.json"
import en from "./translations/en.json"

type TranslationsByLocales = Record<string, Record<string, string>>

const configTranslations = config.languages
  .filter((l) => !!l.translations)
  .reduce((prev, curr) => ({ ...prev, [curr.code]: curr.translations }), {})
const translationsByLocales = merge({ de, en }, configTranslations)
const defaultLocale = resolveDefaultLocale(config)

export type TranslationKey = keyof typeof en

export function useTranslate(locale: string | undefined) {
  const resolvedLocale = locale ?? defaultLocale
  const translations = translationsByLocales[resolvedLocale]
  const defaultTranslations = translationsByLocales[defaultLocale]
  if (!translations) {
    throw new AstroError(
      `No translations found for locale ${resolvedLocale}`,
      "Add them to your lightnet config",
    )
  }
  // We add (string & NonNullable<unknown>) to preserve typescript autocompletion for known keys
  return (
    key: TranslationKey | (string & NonNullable<unknown>),
    options?: { fallbackToKey: boolean },
  ) => {
    const value = translations[key] ?? defaultTranslations[key]
    if (!value && options?.fallbackToKey) {
      return key
    }
    if (!value) {
      throw new AstroError(
        `No translation exists for key '${key}' and locale '${resolvedLocale}'.`,
      )
    }
    return value
  }
}

function merge(
  source: TranslationsByLocales,
  toMerge: TranslationsByLocales,
): TranslationsByLocales {
  const result = { ...source }
  for (const key of Object.keys(toMerge)) {
    if (!source[key]) {
      result[key] = toMerge[key]
    } else {
      result[key] = { ...source[key], ...toMerge[key] }
    }
  }
  return result
}
