import { verifySchema } from "@lightnet/library/utils"
import type { AstroIntegration } from "astro"
import type { ViteUserConfig } from "astro/config"
import { z } from "astro/zod"

import { vitePluginExportAdminImages } from "./export-admin-images"

const languagesSchema = z.record(
  z.string({ description: "language-code" }),
  z.object({}),
)

// See https://decapcms.org/docs/backends-overview/
const backendSchema = z.object({
  name: z.enum([
    "git-gateway",
    "github",
    "gitlab",
    "azure",
    "gitea",
    "bitbucket",
  ]),
  branch: z.string().default("main"),
  authType: z.literal("pkce").optional(),
  appId: z.string().optional(),
  repo: z
    .string({
      description:
        "Required for github, gitlab, azure, gitea and bitbucket backends; ignored by git-gateway. Follows the pattern [org-or-username]/[repo-name]",
    })
    .optional(),
  baseUrl: z
    .string({
      description:
        "OAuth client hostname (just the base domain, no path). Required when using an external OAuth server or self-hosted GitLab/Gitea.",
    })
    .optional(),
})

const userConfigSchema = z.object({
  path: z.string().default("admin"),
  languages: languagesSchema.optional(),
  backend: backendSchema.optional(),
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
          entrypoint: "@lightnet/decap-admin/config.ts",
          prerender: true,
        })

        updateConfig({
          vite: {
            plugins: [
              vitePluginDecapAdminConfig(preparedConfig),
              vitePluginExportAdminImages(astroConfig),
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
