import { verifySchema } from "@lightnet/library/utils"
import type { AstroIntegration } from "astro"
import type { ViteUserConfig } from "astro/config"
import { z } from "astro/zod"

const userConfigSchema = z.object({})

export type DecapAdminConfig = z.infer<typeof userConfigSchema> & {
  site?: string
}

export default function lightnetDecapAdmin(
  config: DecapAdminConfig = {},
): AstroIntegration {
  return {
    name: "@lightnet/decap-admin",
    hooks: {
      "astro:config:setup": ({
        injectRoute,
        updateConfig,
        config: astroConfig,
      }) => {
        injectRoute({
          pattern: "admin",
          entrypoint: "@lightnet/decap-admin/Admin.astro",
          prerender: true,
        })
        injectRoute({
          pattern: "admin/config.yml",
          entrypoint: "@lightnet/decap-admin/config.ts",
          prerender: true,
        })

        const preparedConfig = {
          ...verifySchema(
            userConfigSchema,
            config,
            "Invalid config passed to Decap Admin integration.",
          ),
          site: astroConfig.site ?? "localhost:4321",
        }

        updateConfig({
          vite: {
            plugins: [vitePluginDecapAdminConfig(preparedConfig)],
          },
        })
      },
    },
  }
}

const CONFIG = "virtual:lightnet/decapAdminConfig"
const VIRTUAL_MODULES = [CONFIG] as const

function vitePluginDecapAdminConfig(
  config: DecapAdminConfig,
): NonNullable<ViteUserConfig["plugins"]>[number] {
  return {
    name: "vite-plugin-lightnet-decap-admin-config",
    resolveId(id): string | void {
      const module = VIRTUAL_MODULES.find((m) => m === id)
      if (module) return `\0${module}`
    },
    load(id): string | void {
      const module = VIRTUAL_MODULES.find((m) => id === `\0${m}`)
      switch (module) {
        case CONFIG:
          return `export default ${JSON.stringify(config)};`
      }
    },
  }
}
