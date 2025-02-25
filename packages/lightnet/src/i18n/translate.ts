import { AstroError } from "astro/errors"
import i18next, { type TOptions } from "i18next"
import config from "virtual:lightnet/config"
import YAML from "yaml"

import { resolveDefaultLocale } from "./resolve-default-locale"
import { resolveLanguage } from "./resolve-language"
import type { LightNetTranslationKey } from "./translation-key"

type TranslationsByLocales = Record<string, Record<string, string>>

// We add (string & NonNullable<unknown>) to preserve typescript autocompletion for known keys
export type TranslationKey =
  | LightNetTranslationKey
  | (string & NonNullable<unknown>)

export type TranslateFn = (key: TranslationKey, options?: TOptions) => string

const languageCodes = [
  ...new Set(
    config.languages.flatMap((lng) => [
      lng.code,
      ...lng.fallbackLanguages,
      "en",
    ]),
  ),
]
const defaultLocale = resolveDefaultLocale(config)

const builtInTranslations = await loadTranslations("/i18n/translations")
const userTranslations = await loadTranslations("/src/translations")

await i18next.init({
  lng: defaultLocale,
  // don't use name spacing
  nsSeparator: false,
  // only use flat keys
  keySeparator: false,
  resources: prepareI18nextTranslations(),
})

export function useTranslate(bcp47: string | undefined): TranslateFn {
  const resolvedLocale = bcp47 ?? defaultLocale
  const t = i18next.getFixedT<TranslationKey>(resolvedLocale)
  const fallbackLng = [
    ...resolveLanguage(resolvedLocale).fallbackLanguages,
    defaultLocale,
    "en",
  ]
  return (key, options) => {
    const value = t(key, { fallbackLng, ...options })
    // i18next will return the key if no translation is found.
    // If a value starts with ln. or x. we consider it to be
    // a untranslated translation key.
    if (value.match(/^(?:ln|x)\../i)) {
      throw new AstroError(
        `Missing translation: '${key}' is undefined for language '${resolvedLocale}'.`,
        `Add a translation for '${key}' to src/translations/${resolvedLocale}.yml`,
      )
    }
    return value
  }
}

async function loadTranslations(path: string) {
  const translations: TranslationsByLocales = {}
  const imports = Object.entries(
    import.meta.glob(
      ["./translations/*.(yml|yaml)", "/src/translations/*.(yml|yaml)"],
      {
        query: "?raw",
        import: "default",
      },
    ),
  )
  const addTranslation = async (bcp47: string) => {
    const translationImport = imports.find(([importPath]) =>
      importPath.includes(`${path}/${bcp47}.`),
    )?.[1]
    if (!translationImport) {
      return
    }
    const translationsYml = (await translationImport()) as string
    translations[bcp47] = YAML.parse(translationsYml)
  }
  await Promise.all(languageCodes.map((lng) => addTranslation(lng)))
  return translations
}

function prepareI18nextTranslations() {
  const result: Record<string, { translation: Record<string, string> }> = {}
  for (const bcp47 of languageCodes) {
    result[bcp47] = {
      translation: {
        ...builtInTranslations[bcp47],
        ...userTranslations[bcp47],
      },
    }
  }
  return result
}
