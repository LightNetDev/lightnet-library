import type { TranslationKey, Translations } from "./search-translations";

export const useProvidedTranslations = (translations: Translations) => {
  return (key: TranslationKey) => translations[key];
};
