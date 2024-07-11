import type { AstroIntegration } from "astro"
import { z } from "astro/zod"

const adminConfig = z.object({})

export default function lightnetDecapAdmin(): AstroIntegration {
  return {
    name: "@lightnet/decap-admin",
    hooks: {
      "astro:config:setup": ({ injectRoute }) => {
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
      },
    },
  }
}
