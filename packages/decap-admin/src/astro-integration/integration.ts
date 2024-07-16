import { verifySchema } from "@lightnet/library/utils"
import type { AstroIntegration } from "astro"
import type { ViteUserConfig } from "astro/config"
import { z } from "astro/zod"

import { vitePluginExportAdminImages } from "./export-admin-images"

const languagesSchema = z.record(
  z.string({ description: "language-code" }),
  z.object({}),
)

/**
 * @see https://decapcms.org/docs/gitlab-backend/
 */
const gitlabSchema = z.object({
  name: z.literal("gitlab"),
  repo: z.string(),
  appId: z.string(),
  branch: z.string().default("main"),
  authType: z.literal("pkce").default("pkce"),
})

/**
 * @see https://decapcms.org/docs/github-backend/
 */
const githubSchema = z.object({
  name: z.literal("github"),
  repo: z.string(),
  baseUrl: z.string(),
  branch: z.string().default("main"),
})

const userConfigSchema = z.object({
  path: z.string().default("admin"),
  defaultLocale: z.string().optional(),
  languages: languagesSchema.optional(),
  backend: gitlabSchema.or(githubSchema).optional(),
})

export type DecapAdminConfig = z.input<typeof userConfigSchema>

export type DecapAdminUserConfig = z.output<typeof userConfigSchema> & {
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
        const preparedConfig = {
          ...verifySchema(
            userConfigSchema,
            config,
            "Invalid config passed to Decap Admin integration.",
          ),
          site: astroConfig.site ?? "localhost:4321",
        }

        injectRoute({
          pattern: preparedConfig.path,
          entrypoint: "@lightnet/decap-admin/Admin.astro",
          prerender: true,
        })
        injectRoute({
          pattern: `${preparedConfig.path}/config.yml`,
          entrypoint: "@lightnet/decap-admin/decap-config.ts",
          prerender: true,
        })

        updateConfig({
          vite: {
            plugins: [
              vitePluginDecapAdminConfig(preparedConfig),
              vitePluginExportAdminImages(astroConfig, preparedConfig),
            ],
          },
        })
      },
    },
  }
}

const CONFIG = "virtual:lightnet/decapAdminUserConfig"
const VIRTUAL_MODULES = [CONFIG] as const

function vitePluginDecapAdminConfig(
  userConfig: DecapAdminUserConfig,
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
          return `export default ${JSON.stringify(userConfig)};`
      }
    },
  }
}
