import lightNet from "@lightnet/library"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [
    lightNet({
      title: "Sk8 Ministries",
      logo: { src: "./src/assets/logo.png" },
      defaultLocale: "en",
      locales: ["en", "de"],
      mainMenu: [
        {
          href: "/",
          label: "ln.home.title",
        },
        { href: "/media", label: "ln.search.title" },
        {
          href: "https://www.om.org/eng/mediaworks/lightnet",
          isExternal: true,
          label: "navigation.about-lightnet",
        },
      ],
    }),
  ],
})
