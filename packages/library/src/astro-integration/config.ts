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
    direction: z.enum(["rtl", "ltr"]).default("ltr"),
  }),
)

const faviconSchema = z.object({
  href: z.string({
    description:
      "The favicon for your site which should be a path to an image in the `public/` directory.",
  }),
  rel: z.enum(["icon", "apple-touch-icon"]).default("icon"),
  sizes: z.string().optional(),
})

export const configSchema = z.object({
  /**
   * Title of the web site.
   */
  title: z.string(),
  /**
   * Locales to use for the user interface translations.
   */
  locales: z.string().array(),
  /**
   * Default user interface language.
   */
  defaultLocale: z.string(),
  /**
   * Favicons for your site.
   */
  favicon: faviconSchema.array().optional(),
  /**
   * Link to manifest file within public/ folder
   */
  manifest: z.string().optional(),
  /**
   * Logo to be used for the header.
   */
  logo: z.object({
    src: z.string(),
    alt: z.string().default(""),
  }),
  translations: translationsSchema.optional(),
  /**
   * Content and user interface languages.
   */
  languages: languagesSchema.optional(),
  /**
   * Main menu structure.
   */
  mainMenu: z.array(linkSchema).min(1).optional(),
})

export type Languages = z.input<typeof languagesSchema>
export type Translations = z.input<typeof translationsSchema>
export type Link = z.input<typeof linkSchema>

export type LightnetConfig = z.input<typeof configSchema>
export type PreparedLightnetConfig = z.output<typeof configSchema>
