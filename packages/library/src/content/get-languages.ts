import { resolveLanguageLabel } from "../i18n/resolve-language"
import { getMediaItems } from "./get-media-items"

/**
 * Language names by language codes.
 */
export const contentLanguages = Object.fromEntries(
  (await getMediaItems())
    .map((item) => item.data.language)
    .sort((a, b) => a.localeCompare(b))
    .map((language) => [language, resolveLanguageLabel(language)]),
)

export const contentLanguagesCount = Object.keys(contentLanguages).length
