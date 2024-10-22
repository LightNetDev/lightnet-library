import { resolveLanguage } from "../i18n/resolve-language"
import { getMediaItems } from "./get-media-items"

/**
 * Language names by language codes.
 */
export const contentLanguages = Object.values(
  Object.fromEntries(
    (await getMediaItems()).map(({ data: { language } }) => [
      language,
      resolveLanguage(language),
    ]),
  ),
).sort((a, b) => a.name.localeCompare(b.name))
