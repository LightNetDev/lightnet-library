import { type TranslateFn } from "../i18n/translate"
import { getMediaItems } from "./get-media-items"
import { resolveCategoryLabel } from "./resolve-category-label"

const contentCategories = new Set<string>(
  (await getMediaItems())
    .flatMap((item) => item.data.categories ?? [])
    .map((c) => c.id),
)

export async function getCategories(currentLocale: string, t: TranslateFn) {
  return [...contentCategories.values()]
    .map((id) => ({ id, label: resolveCategoryLabel(t, id) }))
    .sort((a, b) => a.label.localeCompare(b.label, currentLocale))
}
