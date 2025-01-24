import { AstroError } from "astro/errors"
import config from "virtual:lightnet/config"

import { resolveDefaultLocale } from "./resolve-default-locale"
import de from "./translations/de.json"
import en from "./translations/en.json"

type TranslationsByLocales = Record<string, Record<string, string>>

// We add (string & NonNullable<unknown>) to preserve typescript autocompletion for known keys
export type TranslationKey = keyof typeof en | (string & NonNullable<unknown>)
export type TranslationOptions = { allowFixedStrings?: boolean }

export type TranslateFn = (
  key: TranslationKey,
  options?: TranslationOptions,
) => string

const configTranslations = config.languages
  .filter((l) => !!l.translations)
  .reduce((prev, curr) => ({ ...prev, [curr.code]: curr.translations }), {})
const translationsByLocales = merge({ de, en }, configTranslations)
const defaultLocale = resolveDefaultLocale(config)

export function useTranslate(locale: string | undefined): TranslateFn {
  const resolvedLocale = locale ?? defaultLocale
  const translations = translationsByLocales[resolvedLocale]
  const defaultTranslations = translationsByLocales[defaultLocale]
  if (!translations) {
    throw new AstroError(
      `No translations found for language ${resolvedLocale}`,
      "Add them to your lightnet config inside astro.config.mjs.",
    )
  }
  return (key: TranslationKey, options?: TranslationOptions) => {
    const value = translations[key] ?? defaultTranslations[key]
    const isTranslationKey = key.startsWith("custom.") || key.startsWith("ln.")
    if (!value && options?.allowFixedStrings && !isTranslationKey) {
      return key
    }
    if (!value) {
      throw new AstroError(
        `Missing translation: '${key}' is undefined for language '${resolvedLocale}'.`,
        `Add a translation for '${key}' to src/translations/${resolvedLocale}.json`,
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
