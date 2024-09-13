import config from "virtual:lightnet/config"

import { useTranslate } from "../i18n/use-translate"
import type { Category } from "./content-schema-internal"
import { getMediaItems } from "./get-media-items"
import { resolveCategoryLabel } from "./resolve-category-label"

export async function getCategories(locale?: string) {
  const categories = new Set<Category>(
    (await getMediaItems()).flatMap((item) => item.data.categories ?? []),
  )
  const t = useTranslate(locale)
  return [...categories.values()]
    .map((id) => ({ id, label: resolveCategoryLabel(t, id) }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, locale ?? config.defaultLocale),
    )
}
