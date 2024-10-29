import { useMemo } from "react"

import type { Language } from "../i18n/languages"
import type { SearchItem } from "../pages/api/search-response"
import { detailsPagePath } from "../utils/paths"
import Icon from "./Icon"

export type MediaType = {
  id: string
  label: string
  icon: string
}

interface Props {
  items: SearchItem[]
  locale: string | undefined
  categories: Record<string, string>
  contentLanguages: Language[]
  mediaTypes: MediaType[]
  className?: string
}

/**
 * This component originally renders search results.
 * But it can also be reused to render any list of media items.
 * We want consistent look and feel btw different media items lists on our sites
 * this is why we have extracted this list from the search page to be reused.
 *
 * Since search is using a subset of the MediaItem type we have to use search result shape
 * here. Use MediaItemList.astro as wrapper to be populated with MediaItems.
 */
export default function SearchResultList({
  items,
  locale,
  categories,
  contentLanguages,
  mediaTypes,
  className,
}: Props) {
  const types = useMemo(
    () =>
      Object.fromEntries(
        mediaTypes.map(({ id, icon, label }) => [id, { icon, label }]),
      ),
    [mediaTypes],
  )
  const languages = useMemo(
    () => Object.fromEntries(contentLanguages.map((lang) => [lang.code, lang])),
    [contentLanguages],
  )
  return (
    <ol className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item) => (
        <li key={item.id} lang={item.language}>
          <a
            href={detailsPagePath(locale, {
              id: item.id,
            })}
            className="group flex overflow-hidden py-6 transition-colors ease-in-out md:rounded-sm md:py-10 md:hover:bg-gray-100"
          >
            <div className="flex h-36 w-36 shrink-0 flex-col items-start justify-center">
              <img
                className="max-h-36 w-auto max-w-36 rounded-sm object-contain shadow-md"
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt=""
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="ml-5 flex grow flex-col justify-center text-xs sm:ml-8">
              <h2 className="mb-1 line-clamp-3 text-sm font-bold text-gray-700 md:mb-3 md:text-base">
                <Icon
                  className={`${types[item.type].icon} mr-2 align-bottom text-2xl text-gray-700`}
                  ariaLabel={types[item.type].label}
                />
                <span>{item.title}</span>
              </h2>
              <div className="mb-3 flex flex-col flex-wrap items-start gap-2 md:flex-row md:items-center md:gap-3">
                {!!item.authors?.length && (
                  <p className="mb-1 md:mb-0 md:text-base">
                    {item.authors.join(", ")}
                  </p>
                )}
                {contentLanguages.length > 1 && (
                  <span className="rounded-lg border border-gray-300 px-2 py-1 text-gray-500">
                    {languages[item.language].name}
                  </span>
                )}
                <ul lang={locale} className="flex flex-wrap gap-1">
                  {item.categories?.map((category) => (
                    <li
                      key={category}
                      className="rounded-lg bg-gray-200 px-2 py-1 text-gray-600"
                    >
                      {categories[category]}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden sm:block">
                <p
                  className="line-clamp-3 max-w-screen-sm text-xs text-gray-500"
                  lang={item.language}
                  dir={languages[item.language].direction}
                >
                  {item.description}
                </p>
              </div>
            </div>
            <Icon className="mdi--chevron-right md:group-hover:text-primary my-auto ml-2 mr-4 hidden shrink-0 text-2xl text-gray-300 sm:block" />
          </a>
        </li>
      ))}
    </ol>
  )
}
