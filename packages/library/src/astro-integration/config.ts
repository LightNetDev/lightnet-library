import { z } from "astro/zod"

const linkSchema = z.object({
  href: z.string(),
  isExternal: z.boolean().default(false),
  label: z.string(),
  requiresLocale: z.boolean().default(true),
})

export const configSchema = z.object({
  title: z.string(),
  locales: z.string().array(),
  defaultLocale: z.string(),
  logo: z.object({
    src: z.string(),
    alt: z.string().default(""),
  }),
  translations: z.record(z.string(), z.record(z.string(), z.string())),
  mainMenu: z.array(linkSchema).min(1).optional(),
})

export type LightnetConfig = z.infer<typeof configSchema>
