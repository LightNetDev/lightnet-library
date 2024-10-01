import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import type { AstroIntegration } from "astro"

import type { LightnetConfig } from "./config"
import { vitePluginLightnetConfig } from "./vite-plugin-lightnet-config"

export function lightnetLibrary(
  lightnetConfig: LightnetConfig,
): AstroIntegration {
  return {
    name: "@lightnet/library",
    hooks: {
      "astro:config:setup": async ({
        injectRoute,
        config,
        updateConfig,
        logger,
      }) => {
        injectRoute({
          pattern: "404",
          entrypoint: "@lightnet/library/pages/404.astro",
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

        const { defaultLocale, locales } = lightnetConfig
        updateConfig({
          vite: {
            plugins: [
              await vitePluginLightnetConfig(lightnetConfig, config, logger),
            ],
          },
          i18n: {
            defaultLocale,
            // make sure default locale is included
            locales: locales.includes(defaultLocale)
              ? locales
              : [defaultLocale, ...locales],
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
