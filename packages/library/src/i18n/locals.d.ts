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
    }
  }
}
