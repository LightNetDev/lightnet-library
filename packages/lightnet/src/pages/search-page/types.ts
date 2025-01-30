import type { Language } from "../../i18n/languages"

export type MediaType = {
  id: string
  label: string
  icon: string
}

export type TranslatedLanguage = Language & { name: string }
