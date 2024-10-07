import config from "virtual:lightnet/config"

import { useTranslate } from "../i18n/use-translate"
import { getMediaItems } from "./get-media-items"
import { resolveCategoryLabel } from "./resolve-category-label"

export async function getCategories(locale?: string) {
  const categories = new Set<string>(
    (await getMediaItems())
      .flatMap((item) => item.data.categories ?? [])
      .map((c) => c.id),
  )
  const t = useTranslate(locale)
  return [...categories.values()]
    .map((id) => ({ id, label: resolveCategoryLabel(t, id) }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, locale ?? config.defaultLocale),
    )
}
