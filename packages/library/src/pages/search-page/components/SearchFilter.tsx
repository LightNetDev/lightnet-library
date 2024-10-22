import { useEffect, useRef, useState } from "react"

import Icon from "../../../components/Icon"
import type { Language } from "../../../i18n/languages"
import { useDebounce } from "../hooks/use-debounce"
import type { SearchQuery } from "../hooks/use-search"
import type { MediaType } from "../utils/media-type"
import type { Translations } from "../utils/search-translations"
import { useProvidedTranslations } from "../utils/use-provided-translations"

// URL search params
const SEARCH = "search"
const LANGUAGE = "language"
const TYPE = "type"
const CATEGORY = "category"

interface Props {
  contentLanguages: Language[]
  categories: Record<string, string>
  mediaTypes: MediaType[]
  locale?: string
  translations: Translations
  filterByLocale: boolean
  updateQuery: (query: SearchQuery) => void
}

export default function SearchFilter({
  categories,
  mediaTypes,
  updateQuery,
  translations,
  filterByLocale,
  locale,
  contentLanguages,
}: Props) {
  const languageFilterEnabled = contentLanguages.length > 1
  const typesFilterEnabled = mediaTypes.length > 1
  // Not every media item has a category. So it makes
  // sense to have the filter when there is only one category.
  const categoriesFilterEnabled = Object.keys(categories).length > 0

  const getSearchParam = (name: string, defaultValue = "") => {
    // be lazy to avoid parsing search params all the time
    return () => {
      const searchParams = new URLSearchParams(window.location.search)
      return searchParams.get(name) ?? defaultValue
    }
  }

  const [search, setSearch] = useState(getSearchParam(SEARCH))
  const [language, setLanguage] = useState(() => {
    let initialLanguageFilter = ""
    const hasContentLanguage = contentLanguages.find(
      ({ code }) => code === locale,
    )
    if (
      filterByLocale &&
      locale &&
      hasContentLanguage &&
      languageFilterEnabled
    ) {
      initialLanguageFilter = locale
    }
    return getSearchParam(LANGUAGE, initialLanguageFilter)()
  })
  const [type, setType] = useState(getSearchParam(TYPE))
  const [category, setCategory] = useState(getSearchParam(CATEGORY))

  const searchInput = useRef<HTMLInputElement | null>(null)

  const t = useProvidedTranslations(translations)

  const debouncedSetSearch = useDebounce((value: string) => {
    setSearch(value)
  }, 300)

  useEffect(() => {
    const url = new URL(window.location.href)
    const updateSearchParam = (name: string, value: string) => {
      // Only update when value before and after are different and both are non empty.
      if (value === (url.searchParams.get(name) ?? "")) {
        return
      }
      url.searchParams.set(name, value)
    }

    updateSearchParam(SEARCH, search)
    updateSearchParam(LANGUAGE, language)
    updateSearchParam(TYPE, type)
    updateSearchParam(CATEGORY, category)
    history.replaceState({ ...history.state }, "", url.toString())

    updateQuery({ search, language, type, category })
  }, [search, language, type, category])

  return (
    <>
      <label className="dy-input dy-input-bordered mb-2 flex items-center gap-2">
        <input
          type="search"
          className="grow"
          id="search-input"
          ref={searchInput}
          placeholder={t("ln.search.placeholder")}
          enterKeyHint="search"
          defaultValue={search}
          onInput={(e) => debouncedSetSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && searchInput.current?.blur()}
        />
        <Icon className="mdi--magnify text-xl" />
      </label>
      <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-6 md:mb-10">
        {languageFilterEnabled && (
          <label className="dy-form-control">
            <div className="dy-label">
              <span className="text-xs font-bold uppercase text-gray-500">
                {t("ln.common.language")}
              </span>
            </div>
            <select
              className="dy-select dy-select-bordered sm:dy-select-sm"
              value={language}
              id="language-select"
              onChange={(e) => setLanguage(e.currentTarget.value)}
            >
              <option value="">{t("ln.search.all-languages")}</option>
              {contentLanguages.map(({ code, name }) => (
                <option key={code} value={code} lang={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        )}

        {typesFilterEnabled && (
          <label className="dy-form-control">
            <div className="dy-label">
              <span className="text-xs font-bold uppercase text-gray-500">
                {t("ln.common.type")}
              </span>
            </div>
            <select
              className="dy-select dy-select-bordered sm:dy-select-sm"
              value={type}
              id="type-select"
              onChange={(e) => setType(e.currentTarget.value)}
            >
              <option key="" value="">
                {t("ln.search.all-types")}
              </option>
              {mediaTypes.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}

        {categoriesFilterEnabled && (
          <label className="dy-form-control">
            <div className="dy-label">
              <span className="text-xs font-bold uppercase text-gray-500">
                {t("ln.common.category")}
              </span>
            </div>
            <select
              className="dy-select dy-select-bordered sm:dy-select-sm"
              value={category}
              id="category-select"
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option key="" value="">
                {t("ln.search.all-categories")}
              </option>
              {Object.entries(categories)
                .sort((a, b) => a[1].localeCompare(b[1], locale))
                .map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
            </select>
          </label>
        )}
      </div>
    </>
  )
}
