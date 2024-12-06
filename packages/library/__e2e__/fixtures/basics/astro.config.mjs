import lightnetLibrary from "@lightnet/library"
import { defineConfig } from "astro/config"

import { defaultLocale, languages } from "./src/i18n"
import de from "./src/translations/de.json"
import en from "./src/translations/en.json"

// https://astro.build/config
export default defineConfig({
  site: "https://test.com",
  integrations: [
    lightnetLibrary({
      title: "Basic Test",
      logo: { src: "./src/assets/logo.png" },
      defaultLocale,
      locales: ["en", "de"],
      translations: { en, de },
      languages,
      favicon: [{ href: "favicon.svg" }],
      mainMenu: [
        {
          href: "/",
          label: "ln.home.title",
        },
        { href: "/media", label: "ln.search.title" },
      ],
    }),
  ],
})
