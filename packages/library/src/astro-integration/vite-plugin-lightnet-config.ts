import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { AstroConfig, ViteUserConfig } from "astro"
import { z } from "astro/zod"

import { verifySchema } from "../utils/verify-schema"

const CONFIG = "virtual:lightnet/config"
const LOGO = "virtual:lightnet/logo"

const VIRTUAL_MODULES = [CONFIG, LOGO] as const

const Link = z.object({
  href: z.string(),
  isExternal: z.boolean().default(false),
  label: z.string(),
})

const LightNetConfig = z.object({
  title: z.string(),
  locales: z.string().array(),
  defaultLocale: z.string(),
  logo: z.object({
    src: z.string(),
    alt: z.string().default(""),
  }),
  mainMenu: z.array(Link).min(1).optional(),
})

export type LightNetConfig = z.infer<typeof LightNetConfig>

export function vitePluginLightNetConfig(
  config: LightNetConfig,
  { root }: AstroConfig,
): NonNullable<ViteUserConfig["plugins"]>[number] {
  const resolvePath = (id: string) =>
    JSON.stringify(id.startsWith(".") ? resolve(fileURLToPath(root), id) : id)

  config = verifySchema(
    LightNetConfig,
    config,
    "Invalid config passed to LightNet Library integration.",
  )
  return {
    name: "vite-plugin-lightnet-config",
    resolveId(id): string | void {
      const module = VIRTUAL_MODULES.find((m) => m === id)
      if (module) return `\0${module}`
    },
    load(id): string | void {
      const module = VIRTUAL_MODULES.find((m) => id === `\0${m}`)
      switch (module) {
        case CONFIG:
          return `export default ${JSON.stringify(config)};`
        case LOGO:
          return `import logo from ${resolvePath(config.logo.src)}; export default logo;`
      }
    },
  }
}
