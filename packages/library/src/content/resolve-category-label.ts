export const resolveCategoryLabel = (
  translate: (key: string) => string,
  category: string,
) => {
  return translate(`ln.category.${category}`)
}
