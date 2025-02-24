import { AstroError } from "astro/errors"
import { getCollection } from "astro:content"

import type { TranslateFn } from "../i18n/translate"

const categories = await getCollection("categories")

export const resolveCategoryLabel = (
  translate: TranslateFn,
  categoryId: string,
) => {
  const category = categories.find((c) => c.id === categoryId)
  if (!category) {
    throw new AstroError(
      `Unknown category: ${categoryId}`,
      "Make sure you add the category to the categories content collection.",
    )
  }
  return translate(category.data.label)
}
