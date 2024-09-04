import { AstroError } from "astro/errors";
import config from "virtual:lightnet/config";

import de from "./translations/de.json";
import en from "./translations/en.json";

type TranslationsByLocales = Record<string, Record<string, string>>;

const bundledTranslations: TranslationsByLocales = {
  de,
  en,
};

export type TranslationKey = keyof typeof en;

export function useTranslate(locale: string | undefined) {
  const translationsByLocales = merge(
    bundledTranslations,
    config.translations ?? {},
  );
  const resolvedLocale = locale ?? config.defaultLocale;
  const translations = translationsByLocales[resolvedLocale];
  const defaultTranslations = translationsByLocales[config.defaultLocale];
  if (!translations) {
    throw new AstroError(
      `No translations found for locale ${resolvedLocale}`,
      "Add them to your lightnet config",
    );
  }
  // We add (string & NonNullable<unknown>) to preserve typescript autocompletion for known keys
  return (key: TranslationKey | (string & NonNullable<unknown>)) => {
    const value = translations[key] ?? defaultTranslations[key];
    if (!value) {
      throw new AstroError(
        `No translation exists for key '${key}' and locale '${resolvedLocale}'.`,
      );
    }
    return value;
  };
}

function merge(
  source: TranslationsByLocales,
  toMerge: TranslationsByLocales,
): TranslationsByLocales {
  const result = { ...source };
  for (const key of Object.keys(toMerge)) {
    if (!source[key]) {
      result[key] = toMerge[key];
    } else {
      result[key] = { ...source[key], ...toMerge[key] };
    }
  }
  return result;
}
