import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import type { AstroIntegration } from "astro"

import { resolveDefaultLocale } from "../i18n/resolve-default-locale"
import { resolveLocales } from "../i18n/resolve-locales"
import type { LightnetConfig } from "./config"
import { vitePluginLightnetConfig } from "./vite-plugin-lightnet-config"

export function lightnetLibrary(
  lightnetConfig: LightnetConfig,
): AstroIntegration {
  return {
    name: "@lightnet/library",
    hooks: {
      "astro:config:setup": ({ injectRoute, config, updateConfig, logger }) => {
        injectRoute({
          pattern: "404",
          entrypoint: "@lightnet/library/pages/404.astro",
          prerender: true,
        })

        injectRoute({
          pattern: "",
          entrypoint: "@lightnet/library/pages/RedirectToDefaultLocale.astro",
          prerender: true,
        })

        injectRoute({
          pattern: "/[locale]/media",
          entrypoint: "@lightnet/library/pages/SearchPage.astro",
          prerender: true,
        })

        injectRoute({
          pattern: "/api/search.json",
          entrypoint: "@lightnet/library/pages/api/search.ts",
          prerender: true,
        })

        injectRoute({
          pattern: "/[locale]/media/[slug]",
          entrypoint: "@lightnet/library/pages/DetailsPage.astro",
          prerender: true,
        })

        config.integrations.push(tailwind(), react())

        updateConfig({
          vite: {
            plugins: [vitePluginLightnetConfig(lightnetConfig, config, logger)],
          },
          i18n: {
            defaultLocale: resolveDefaultLocale(lightnetConfig),
            locales: resolveLocales(lightnetConfig),
            routing: {
              redirectToDefaultLocale: false,
              prefixDefaultLocale: false,
              fallbackType: "rewrite",
            },
          },
        })
      },
    },
  }
}
