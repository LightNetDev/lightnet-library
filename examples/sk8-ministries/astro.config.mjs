import lightnetDecapAdmin from "@lightnet/decap-admin"
import lightnetLibrary from "@lightnet/library"
import { defineConfig } from "astro/config"

import deTranslations from "./src/translations/de.json"
import enTranslations from "./src/translations/en.json"

/**
 * Defines the languages available on the site.
 *
 * This array includes both user interface languages and content languages.
 *
 * @type {import('@lightnet/library').Language[]}
 */
const languages = [
  {
    code: "en", // Language code for English
    name: "English", // Display name of the language
    translations: enTranslations, // UI Translations for English
    isDefaultLocale: true, // Indicates if this is the default language
  },
  {
    code: "de",
    name: "Deutsch",
    translations: deTranslations,
  },
]

export default defineConfig({
  site: "https://sk8-ministries.pages.dev",
  integrations: [
    lightnetLibrary({
      title: "Sk8 Ministries",
      logo: { src: "./src/assets/logo.png" },
      languages: languages,
      favicon: [
        { href: "favicon.ico", sizes: "32x32" },
        { href: "favicon.svg" },
      ],
      mainMenu: [
        {
          href: "/",
          label: "ln.home.title",
        },
        { href: "/media", label: "ln.search.title" },
        { href: "/about", label: "navigation.about" },
        {
          href: "https://www.om.org/eng/mediaworks/lightnet",
          isExternal: true,
          label: "navigation.about-lightnet",
        },
      ],
      searchPage: {
        filterByLocale: true,
      },
    }),
    lightnetDecapAdmin({
      languages: languages,
    }),
  ],
})
