import { useEffect, useRef, useState } from "react"

import Icon from "../../../components/Icon"
import { useDebounce } from "../hooks/use-debounce"
import type { SearchQuery } from "../hooks/use-search"
import type { MediaType } from "../utils/media-type"
import type { Translations } from "../utils/search-translations"
import { useProvidedTranslations } from "../utils/use-provided-translations"

const QUERY_PARAM_SEARCH = "search"
const QUERY_PARAM_LANGUAGE = "language"
const QUERY_PARAM_TYPE = "type"
const QUERY_PARAM_CATEGORY = "category"

interface Props {
  contentLanguages: Record<string, string>
  categories: Record<string, string>
  mediaTypes: MediaType[]
  locale?: string
  translations: Translations
  filterByUILanguage: boolean
  updateQuery: (query: SearchQuery) => void
}

export default function SearchFilter({
  categories,
  mediaTypes,
  updateQuery,
  translations,
  filterByUILanguage,
  locale,
  contentLanguages,
}: Props) {
  let initialLanguageFilter = ""
  const hasMoreThanOneLanguage = Object.keys(contentLanguages).length > 1
  if (
    filterByUILanguage &&
    locale &&
    contentLanguages[locale] &&
    hasMoreThanOneLanguage
  ) {
    initialLanguageFilter = locale
  }

  const [search, setSearch] = useState("")
  const [language, setLanguage] = useState(initialLanguageFilter)
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const searchInput = useRef<HTMLInputElement | null>(null)

  const t = useProvidedTranslations(translations)

  const debouncedSetSearch = useDebounce((value: string) => {
    setSearch(value)
  }, 300)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const search = searchParams.get(QUERY_PARAM_SEARCH) ?? undefined
    const language = searchParams.get(QUERY_PARAM_LANGUAGE) ?? undefined
    const type = searchParams.get(QUERY_PARAM_TYPE) ?? undefined
    const category = searchParams.get(QUERY_PARAM_CATEGORY) ?? undefined

    if (search) {
      setSearch(search)
    }
    if (language) {
      setLanguage(language)
    }
    if (type) {
      setType(type)
    }
    if (category) {
      setCategory(category)
    }

    updateQuery({ search, language, type, category })
  }, [])

  useEffect(() => {
    // update search params
    const url = new URL(window.location.href)
    const updateParams = (name: string, value: string) =>
      value ? url.searchParams.set(name, value) : url.searchParams.delete(name)
    updateParams(QUERY_PARAM_SEARCH, search)
    updateParams(QUERY_PARAM_LANGUAGE, language)
    updateParams(QUERY_PARAM_TYPE, type)
    updateParams(QUERY_PARAM_CATEGORY, category)
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
            {Object.entries(contentLanguages).map(([lang, label]) => (
              <option key={lang} value={lang} lang={lang}>
                {label}
              </option>
            ))}
          </select>
        </label>

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
            {Object.entries(categories).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
}
