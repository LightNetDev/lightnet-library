import { defineConfig } from "vitest/config"

import { vitePluginLightnetConfig } from "./src/astro-integration/vite-plugin-lightnet-config"

export default defineConfig({
  test: {
    include: ["__tests__/**/*.spec.ts"],
  },
  plugins: [
    vitePluginLightnetConfig(
      {
        title: "Sk8 Ministries",
        locales: ["en"],
        defaultLocale: "en",
        logo: { src: "./logo.svg" },
        languages: [{ code: "en", name: "English" }],
      },
      { site: "https://sk8-ministries.dev" },
    ),
  ],
})
