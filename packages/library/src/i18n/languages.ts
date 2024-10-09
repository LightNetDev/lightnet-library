import config from "virtual:lightnet/config"

export type Language = {
  label: string
  direction?: "rtl" | "ltr"
}

export const BUNDLED_LANGUAGES = {
  de: { label: "Deutsch", direction: "ltr" },
  en: { label: "English", direction: "ltr" },
} as const

export const ALL_LANGUAGES: Record<string, Language> =
  config.languages ?? BUNDLED_LANGUAGES
