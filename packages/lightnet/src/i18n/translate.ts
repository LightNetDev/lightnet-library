import { AstroError } from "astro/errors"
import i18next, { type TOptions } from "i18next"
import config from "virtual:lightnet/config"
import YAML from "yaml"

import { resolveDefaultLocale } from "./resolve-default-locale"
import { resolveLocales } from "./resolve-locales"
import type { LightNetTranslationKey } from "./translations/translation-key"

type TranslationsByLocales = Record<string, Record<string, string>>

// We add (string & NonNullable<unknown>) to preserve typescript autocompletion for known keys
export type TranslationKey =
  | LightNetTranslationKey
  | (string & NonNullable<unknown>)

export type TranslateFn = (key: TranslationKey, options?: TOptions) => string

const locales = resolveLocales(config)
const defaultLocale = resolveDefaultLocale(config)

const builtInTranslations = await loadTranslations("/i18n/translations")
const userTranslations = await loadTranslations("/src/translations")

await i18next.init({
  lng: defaultLocale,
  fallbackLng: [defaultLocale, "en"],
  // don't use name spacing
  nsSeparator: false,
  // only use flat keys
  keySeparator: false,
  resources: prepareI18nextTranslations(),
})

export function useTranslate(locale: string | undefined): TranslateFn {
  const resolvedLocale = locale ?? defaultLocale
  const t = i18next.getFixedT<TranslationKey>(resolvedLocale)
  return (key, options) => {
    const value = t(key, options)
    if (value.startsWith("ln.") || value.startsWith("x.")) {
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
  const addTranslation = async (locale: string) => {
    const translationImport = imports.find(([importPath]) =>
      importPath.includes(`${path}/${locale}.`),
    )?.[1]
    if (!translationImport) {
      return
    }
    const translationsYml = (await translationImport()) as string
    translations[locale] = YAML.parse(translationsYml)
  }
  await Promise.all(locales.map((locale) => addTranslation(locale)))
  return translations
}

function prepareI18nextTranslations() {
  const result: Record<string, { translation: Record<string, string> }> = {}
  for (const locale of locales) {
    result[locale] = {
      translation: {
        ...builtInTranslations[locale],
        ...userTranslations[locale],
      },
    }
  }
  return result
}
