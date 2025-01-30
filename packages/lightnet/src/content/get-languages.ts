import { resolveLanguage } from "../i18n/resolve-language"
import { getMediaItems } from "./get-media-items"

/**
 * Array of distinct content languages.
 */
export const contentLanguages = Object.values(
  Object.fromEntries(
    (await getMediaItems()).map(({ data: { language } }) => [
      language,
      resolveLanguage(language),
    ]),
  ),
)
