import lightnetLibrary from "@lightnet/library"
import { defineConfig } from "astro/config"

import de from "./src/translations/de.json"
import en from "./src/translations/en.json"

// https://astro.build/config
export default defineConfig({
  site: "https://test.com",
  integrations: [
    lightnetLibrary({
      title: "Basic Test",
      logo: { src: "./src/assets/logo.png" },
      languages: [
        {
          code: "en",
          name: "English",
          translations: en,
          isDefaultLocale: true,
        },
        {
          code: "de",
          name: "Deutsch",
          translations: de,
        },
      ],
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
