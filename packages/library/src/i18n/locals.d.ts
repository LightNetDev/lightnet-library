declare namespace App {
  interface Locals {
    /**
     * Provides internationalization helpers.
     */
    i18n: {
      /**
       * Use this function to translate a key to the current locale.
       *
       * @param TranslationKey to be translated.
       */
      t: import("./translate").TranslateFn

      /**
       *  The current locale or the default locale if the current locale is not available.
       *
       *  In comparison to Astro.currentLocale this will always return a locale.
       *  Use Astro.currentLocale if you want to know the locale that is included in the current path.
       */
      currentLocale: string

      /**
       * The default locale as defined in the project configuration.
       */
      defaultLocale: string

      /**
       * The available locales as defined in the project configuration.
       */
      locales: string[]
    }
  }
}
