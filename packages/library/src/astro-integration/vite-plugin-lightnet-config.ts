import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { AstroConfig, AstroIntegrationLogger, ViteUserConfig } from "astro"

import { verifySchema } from "../utils/verify-schema"
import { configSchema, type LightnetConfig } from "./config"

const CONFIG = "virtual:lightnet/config"
const LOGO = "virtual:lightnet/logo"

const VIRTUAL_MODULES = [CONFIG, LOGO] as const

export function vitePluginLightnetConfig(
  config: LightnetConfig,
  { root }: AstroConfig,
  logger: AstroIntegrationLogger,
): NonNullable<ViteUserConfig["plugins"]>[number] {
  const resolvePath = (id: string) =>
    JSON.stringify(id.startsWith(".") ? resolve(fileURLToPath(root), id) : id)

  config = verifySchema(
    configSchema,
    config,
    "Invalid config passed to LightNet Library integration.",
  )
  return {
    name: "vite-plugin-lightnet-config",
    resolveId(id): string | void {
      const module = VIRTUAL_MODULES.find((m) => m === id)
      if (module) return `\0${module}`
    },
    handleHotUpdate({ file, server }) {
      const srcPath = resolve(fileURLToPath(root), "src/translations/")
      if (file.endsWith(".json") && file.startsWith(srcPath)) {
        logger.info(`Update translations ${file.slice(srcPath.length)}`)
        server.restart()
      }
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
