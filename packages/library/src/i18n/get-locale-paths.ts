import type { GetStaticPaths } from "astro"
import config from "virtual:lightnet/config"

import { resolveLocales } from "./resolve-locales"

export const getLocalePaths = (() => {
  return resolveLocales(config).map((locale) => ({ params: { locale } }))
}) satisfies GetStaticPaths
