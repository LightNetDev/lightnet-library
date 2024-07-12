import { z } from "astro/zod"

const linkSchema = z.object({
  href: z.string(),
  isExternal: z.boolean().default(false),
  label: z.string(),
  requiresLocale: z.boolean().default(true),
})

const translationsSchema = z.record(
  z.string({ description: "language-code" }),
  z.record(
    z.string({ description: "translation key" }),
    z.string({ description: "translation value" }),
  ),
)

const languagesSchema = z.record(
  z.string({ description: "language-code" }),
  z.object({
    label: z.string({ description: "This label will not be translated" }),
    direction: z.enum(["rtl", "ltr"]).default("ltr").optional(),
  }),
)

export const configSchema = z.object({
  title: z.string(),
  locales: z.string().array(),
  defaultLocale: z.string(),
  logo: z.object({
    src: z.string(),
    alt: z.string().default(""),
  }),
  translations: translationsSchema.optional(),
  languages: languagesSchema.optional(),
  mainMenu: z.array(linkSchema).min(1).optional(),
})

export type Languages = z.infer<typeof languagesSchema>
export type Translations = z.infer<typeof translationsSchema>
export type Link = z.infer<typeof linkSchema>

export type LightnetConfig = z.infer<typeof configSchema>
