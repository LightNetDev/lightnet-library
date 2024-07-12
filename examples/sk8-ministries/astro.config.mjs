import lightnetDecapAdmin from "@lightnet/decap-admin"
import lightnetLibrary from "@lightnet/library"
import { defineConfig } from "astro/config"

import languages from "./src/languages"
import de from "./src/translations/de.json"
import en from "./src/translations/en.json"

// https://astro.build/config
export default defineConfig({
  site: "https://sk8-ministries.pages.dev",
  integrations: [
    lightnetLibrary({
      title: "Sk8 Ministries",
      logo: { src: "./src/assets/logo.png" },
      defaultLocale: "en",
      locales: ["en", "de"],
      translations: { de, en },
      languages,
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
        {
          href: "/admin",
          label: "navigation.admin",
          requiresLocale: false,
        },
      ],
    }),
    lightnetDecapAdmin({ languages }),
  ],
})
