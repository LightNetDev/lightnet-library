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

const languageSchema = z.object({
  code: z.string(),
  name: z.string({ description: "This name will not be translated" }),
  direction: z.enum(["rtl", "ltr"]).default("ltr"),
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
   * Languages to use for the user interface translation. This
   * is BCP-47 language codes.
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
  manifest: z.string().transform(absolutePath).optional(),
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
  languages: languageSchema.array(),
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
export type Translations = z.input<typeof translationsSchema>
export type Link = z.input<typeof linkSchema>

export type LightnetConfig = z.input<typeof configSchema>
export type PreparedLightnetConfig = z.output<typeof configSchema>
