export { getLocalePaths } from "../src/i18n/get-locale-paths"
import { useTranslate as useTranslateInternal } from "../src/i18n/use-translate"

// Export useTranslate without auto completion for internal lightnet keys.
// Because in most cases it will be used with custom keys.
export const useTranslate = useTranslateInternal as (
  locale: string | undefined,
) => (key: string) => string
