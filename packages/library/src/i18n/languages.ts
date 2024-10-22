import config from "virtual:lightnet/config"

export const BUNDLED_LANGUAGES = [
  { code: "de", name: "Deutsch", direction: "ltr" },
  { code: "en", name: "English", direction: "ltr" },
]

export const ALL_LANGUAGES = config.languages ?? BUNDLED_LANGUAGES

export type Language = (typeof ALL_LANGUAGES)[number]
