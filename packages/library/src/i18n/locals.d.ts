declare namespace App {
  interface Locals {
    /**
     * Use this function to translate a key to the current locale.
     *
     * @param TranslationKey to be translated.
     */
    t: import("./locals").I18nT
  }
}
