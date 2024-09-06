const translationKeys = [
  "ln.search.no-results",
  "ln.search.title",
  "ln.common.language",
  "ln.search.placeholder",
  "ln.search.all-languages",
  "ln.common.type",
  "ln.search.all-types",
  "ln.common.category",
  "ln.search.all-categories",
  "ln.search.more-results",
] as const

export type TranslationKey = (typeof translationKeys)[number]

export type Translations = Record<TranslationKey, string>

export const provideTranslations = (translate: (key: string) => string) => {
  return Object.fromEntries(
    translationKeys.map((key) => [key, translate(key)]),
  ) as Translations
}
