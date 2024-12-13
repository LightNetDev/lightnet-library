import lightnetLibrary from "@lightnet/library"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://test.com",
  integrations: [
    lightnetLibrary({
      title: "Monolingual page",
      logo: { src: "./src/assets/logo.png" },
      languages: [
        {
          code: "en",
          name: "English",
          isDefaultLocale: true,
        }
      ],
      favicon: [{ href: "favicon.svg" }],
      mainMenu: [
        {
          href: "/",
          label: "Home",
        },
        { href: "/media", label: "Search" },
      ],
    }),
  ],
})
