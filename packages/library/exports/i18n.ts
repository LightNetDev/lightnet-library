export { default as BUNDLED_LANGUAGES } from "../src/i18n/bundled-languages.json"
export { getLocalePaths } from "../src/i18n/get-locale-paths"
import type { TranslationKeys } from "../../../examples/sk8-ministries/src/i18next";
import { useTranslate as useTranslateInternal } from "../src/i18n/use-translate"

// Export useTranslate without auto completion for internal lightnet keys.
// Because in most cases it will be used with custom keys.
// export const useTranslate = useTranslateInternal as (
//   locale: string | undefined,
// ) => (key: string) => string

export const useTranslate = (locale: string | undefined) => {
  const translate = useTranslateInternal(locale);
  return (key: TranslationKeys) => translate(key);
}
