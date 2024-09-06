import config from "virtual:lightnet/config"
import type { GetStaticPaths } from "astro"

export const getLocalePaths = (() => {
  return config.locales.map((locale) => ({ params: { locale } }))
}) satisfies GetStaticPaths
