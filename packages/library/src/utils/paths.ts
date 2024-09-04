/**
 * Build path to media item page.
 *
 * @param language current locale
 * @param mediaItem  media item
 * @returns path to media item page eg. '/en/media/my-book'
 */
export function detailsPagePath(
  locale: string | undefined,
  { id }: { id: string },
) {
  return localizePath(locale, `/media/${id}`);
}

/**
 * Build path to the search page.
 *
 * @param language current locale
 * @param query  search query params
 * @returns path to the search page eg. '/en/media?category=comics'
 */
export function searchPagePath(
  language: string | undefined,
  filter?: { category: string },
) {
  const searchParams = new URLSearchParams();
  filter?.category && searchParams.append("category", filter.category);
  return localizePath(
    language,
    `/media${searchParams.size ? `?${searchParams.toString()}` : ""}`,
  );
}

/**
 * Resolve a path for a given locale.
 *
 * @param locale current locale
 * @param path to be resolved. A '/' at the beginning of the path is not required.
 * @returns resolved path. Eg. '/en/about' for input "en" and "/about"
 */
export function localizePath(locale: string | undefined, path: string) {
  return `${locale ? `/${locale}` : ""}/${path.replace(/^\//, "")}`;
}
