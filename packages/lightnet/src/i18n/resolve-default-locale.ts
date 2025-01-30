import { AstroError } from "astro/errors"

export const resolveDefaultLocale = ({
  languages,
}: {
  languages: {
    code: string
    isDefaultLocale?: boolean
    translations?: unknown
  }[]
}) => {
  const defaultLanguage = languages.find((l) => l.isDefaultLocale)
  if (defaultLanguage) {
    return defaultLanguage.code
  }
  const uiLanguages = languages.filter((l) => !!l.translations)
  if (uiLanguages.length === 0) {
    throw new AstroError(
      "No user interface language found",
      "Make sure you include a translations object for at least one of your languages.",
    )
  }
  if (uiLanguages.length > 1) {
    throw new AstroError(
      "Could not identify the default user interface language",
      "Make sure you have set one language to be the default language by setting the isDefaultLocale property.",
    )
  }
  return uiLanguages[0].code
}
