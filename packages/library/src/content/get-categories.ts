import config from "virtual:lightnet/config"

import { resolveDefaultLocale } from "../i18n/resolve-default-locale"
import { useTranslate } from "../i18n/translate"
import { getMediaItems } from "./get-media-items"
import { resolveCategoryLabel } from "./resolve-category-label"

const contentCategories = new Set<string>(
  (await getMediaItems())
    .flatMap((item) => item.data.categories ?? [])
    .map((c) => c.id),
)

export async function getCategories(locale?: string) {
  const t = useTranslate(locale)
  return [...contentCategories.values()]
    .map((id) => ({ id, label: resolveCategoryLabel(t, id) }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, locale ?? resolveDefaultLocale(config)),
    )
}
