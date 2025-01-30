import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import type { AstroConfig, AstroIntegrationLogger, ViteUserConfig } from "astro"

import { verifySchema } from "../utils/verify-schema"
import { configSchema, type LightnetConfig } from "./config"

const CONFIG = "virtual:lightnet/config"
const LOGO = "virtual:lightnet/logo"
const PROJECT_CONTEXT = "virtual:lightnet/project-context"

const VIRTUAL_MODULES = [CONFIG, LOGO, PROJECT_CONTEXT] as const

export function vitePluginLightnetConfig(
  lightnetConfig: LightnetConfig,
  { root, srcDir, site }: Pick<AstroConfig, "root" | "srcDir" | "site">,
  logger: AstroIntegrationLogger,
): NonNullable<ViteUserConfig["plugins"]>[number] {
  const resolveFilePath = (id: string) =>
    JSON.stringify(id.startsWith(".") ? resolve(fileURLToPath(root), id) : id)

  const config = verifySchema(
    configSchema,
    lightnetConfig,
    "Invalid config passed to LightNet integration.",
  )
  return {
    name: "vite-plugin-lightnet-config",
    resolveId(id): string | undefined {
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
    load(id): string | undefined {
      const module = VIRTUAL_MODULES.find((m) => id === `\0${m}`)
      switch (module) {
        case CONFIG:
          return `export default ${JSON.stringify(config)};`
        case LOGO:
          return config.logo
            ? `import logo from ${resolveFilePath(config.logo.src)}; export default logo;`
            : "export default undefined;"
        case PROJECT_CONTEXT:
          return `export default ${JSON.stringify({ root, srcDir, site })}`
      }
    },
  }
}
