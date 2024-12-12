import { z } from "astro/zod"

const linkSchema = z.object({
  href: z.string(),
  isExternal: z.boolean().default(false),
  label: z.string(),
  requiresLocale: z.boolean().default(true),
})

const languageSchema = z.object({
  code: z.string({ description: "BCP-47 language code" }),
  name: z.string({ description: "This name will not be translated" }),
  direction: z.enum(["rtl", "ltr"]).default("ltr"),
  translations: z
    .record(
      z.string({ description: "translation key" }),
      z.string({ description: "translation value" }),
    )
    .optional(),
  isDefaultLocale: z
    .boolean({ description: "Is this the default ui language?" })
    .default(false),
})

const absolutePath = (path: string) =>
  `${path.startsWith("/") ? "" : "/"}${path}`

const faviconSchema = z.object({
  href: z
    .string({
      description:
        "The favicon for your site which should be a path to an image in the `public/` directory.",
    })
    .transform(absolutePath),
  rel: z.enum(["icon", "apple-touch-icon"]).default("icon"),
  sizes: z.string().optional(),
})

export const configSchema = z.object({
  /**
   * Title of the web site.
   */
  title: z.string(),
  /**
   * All languages: content languages and ui languages.
   */
  languages: languageSchema.array(),
  /**
   * Favicons for your site.
   */
  favicon: faviconSchema.array().optional(),
  /**
   * Link to manifest file within public/ folder
   */
  manifest: z.string().transform(absolutePath).optional(),
  /**
   * Logo to be used for the header.
   */
  logo: z.object({
    src: z.string(),
    alt: z.string().default(""),
  }),
  /**
   * Main menu structure.
   */
  mainMenu: z.array(linkSchema).min(1).optional(),
  /**
   * Configure search page behavior
   */
  searchPage: z
    .object({
      /**
       * When this is set to true, search results will be initially
       * filtered by UI language. The filter will only be set when there
       * is any media item in the UI language.
       */
      filterByLocale: z.boolean().default(false),
    })
    .optional(),
})

export type Language = z.input<typeof languageSchema>
export type Link = z.input<typeof linkSchema>

export type LightnetConfig = z.input<typeof configSchema>
export type PreparedLightnetConfig = z.output<typeof configSchema>
