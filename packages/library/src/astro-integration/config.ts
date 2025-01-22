import { z } from "astro/zod"

/**
 * Link Schema.
 */
const linkSchema = z.object({
  /**
   * Address this should link to.
   * Can either be a path like "/about" or a full
   * url, like "https://your-ministry.com".
   */
  href: z.string(),
  /**
   * Label to be used for the link.
   * Can either be a translation key or a fixed string.
   */
  label: z.string(),
  /**
   * If this is set to true the currentLocale will be appended to
   * the href path. Eg. for href="/about"
   * the resolved value will be "/en/about" if the current locale is "en".
   *
   * This option will be ignored if the path is a external url.
   *
   * Default is true.
   */
  requiresLocale: z.boolean().default(true),
})

/**
 * Language Schema.
 */
const languageSchema = z.object({
  /**
   * BCP-47 language code for this language.
   *
   * This will be the identifier of this language and will
   * also appear on the URL paths of the website.
   */
  code: z.string({ description: "BCP-47 language code" }),
  /**
   * The name of the language that will be shown on the Website.
   *
   * Can either be a fixed string or a translation key.
   */
  label: z.string(),
  /**
   * The text direction of this language.
   *
   * Either right-to-left = rtl, or left-to-right = ltr.
   *
   * Default is "ltr".
   */
  direction: z.enum(["rtl", "ltr"]).default("ltr"),
  /**
   * Translations for this language.
   * This needs to be set if the the language should be used a UI locale.
   *
   * We expect a flat object with the keys being the translation keys and
   * the values being the translated strings for this language.
   */
  translations: z.record(z.string(), z.string()).optional(),
  /**
   * Should this language be used as the default language for the User Interface.
   *
   * Default locale will be the first language the user sees. Also translations
   * will fallback to use the default locale if no translation entry is found.
   *
   * Default is false.
   */
  isDefaultLocale: z.boolean().default(false),
})

const absolutePath = (path: string) =>
  `${path.startsWith("/") ? "" : "/"}${path}`

/**
 * This API for setting a favicon uses the
 * HTML standard attributes.
 *
 * @see https://en.wikipedia.org/wiki/Favicon
 *
 * We automatically infer the "type" of the icon. So you
 * do not have to set this.
 */
const faviconSchema = z.object({
  /**
   * Reference the favicon. This must be a path to an image in the `public/` directory.
   *
   * @example "/favicon.svg"
   */
  href: z.string().transform(absolutePath),
  /**
   * See HTML standard.
   */
  rel: z.enum(["icon", "apple-touch-icon"]).default("icon"),
  /**
   * See HTML standard.
   */
  sizes: z.string().optional(),
})

/**
 * LightNet Config Schema.
 */
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
  logo: z
    .object({
      src: z.string(),
      alt: z.string().default(""),
    })
    .optional(),
  /**
   * Main menu structure.
   */
  mainMenu: z.array(linkSchema).min(1).optional(),
  /**
   * The internalDomains configuration setting specifies a list of
   * domain names that should be treated as internal.
   *
   * This setting is useful for bypassing external-link handling or marking
   * trusted domains as internal resources.
   *
   * @notes
   * - Domains are matched exactly as listed; wildcard or regex patterns are not supported.
   * - Ensure that only trusted and necessary domains are included in this list.
   */
  internalDomains: z.array(z.string()).default([]),
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
