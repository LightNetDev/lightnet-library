import YAML from "yaml"

const builtInTranslations = ["en", "de"] as const

const builtInImports = Object.fromEntries(
  builtInTranslations.map((lng) => [
    lng,
    () => import(`./translations/${lng}.yml?raw`),
  ]),
)

const userImports = Object.fromEntries(
  Object.entries(
    import.meta.glob(["/src/translations/*.(yml|yaml)"], {
      query: "?raw",
      import: "default",
    }),
  ).map(([path, translationImport]) => {
    const [fileName] = path.split("/").slice(-1)
    const lang = fileName.replace(/\.ya?ml/i, "")
    return [lang, translationImport]
  }),
)

export const loadTranslations = async (bcp47: string) => ({
  ...(await loadBuiltInTranslations(bcp47)),
  ...(await loadUserTranslations(bcp47)),
})

export const loadBuiltInTranslations = async (bcp47: string) => {
  if (!builtInImports[bcp47]) {
    return {}
  }
  const yml = (await builtInImports[bcp47]()).default
  return YAML.parse(yml)
}

export const loadUserTranslations = async (bcp47: string) => {
  if (!userImports[bcp47]) {
    return {}
  }
  const yml = (await userImports[bcp47]()) as string
  return YAML.parse(yml)
}

export type LightNetTranslationKey =
  | "ln.404.go-to-the-home-page"
  | "ln.404.page-not-found"
  | "ln.category"
  | "ln.language"
  | "ln.external-link"
  | "ln.type_one"
  | "ln.details.open"
  | "ln.details.share"
  | "ln.details.part-of-collection"
  | "ln.details.download"
  | "ln.header.open-main-menu"
  | "ln.header.select-language"
  | "ln.home.title"
  | "ln.search.all-categories"
  | "ln.search.all-languages"
  | "ln.search.all-types"
  | "ln.search.more-results"
  | "ln.search.no-results"
  | "ln.search.placeholder"
  | "ln.search.title"
  | "ln.share.url-copied-to-clipboard"
