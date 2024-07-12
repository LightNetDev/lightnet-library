import { CATEGORIES, DETAILS_PAGES } from "@lightnet/library/content"
import { LANGUAGES } from "@lightnet/library/i18n"
import type { APIRoute } from "astro"
import userConfig from "virtual:lightnet/decapAdminConfig"
import YAML from "yaml"

export const GET: APIRoute = () => {
  return new Response(YAML.stringify(config))
}

const config = {
  local_backend: true,
  backend: {
    name: "git-gateway",
  },
  media_folder: "public/files",
  public_folder: "/files",
  editor: { preview: false },
  site_url: userConfig.site,
  collections: [
    {
      name: "media",
      label: "Media",
      label_singular: "Media Item",
      folder: "src/content/media",
      create: true,
      format: "json",
      preview_path: "en/media/{{commonId}}--{{language}}",
      sortable_fields: [
        "commit_date",
        "commonId",
        "commit_author",
        "dateCreated",
        "language",
      ],
      slug: "{{commonId}}--{{language}}",
      summary: "{{commonId}}--{{language}}",
      view_groups: [{ label: "language", field: "language", pattern: ".*" }],
      fields: [
        { name: "title", label: "Title", widget: "string" },
        {
          name: "commonId",
          label: "Common ID",
          widget: "string",
          hint: "The english title, all lowercase, words separated with hyphens. This is WITHOUT the language (eg. --en) suffix.",
        },
        {
          name: "type",
          label: "Type",
          widget: "relation",
          collection: "media-types",
          value_field: "{{slug}}",
          search_fields: ["{{slug}}"],
        },
        {
          name: "language",
          label: "Language",
          widget: "select",
          options: Object.keys(LANGUAGES),
        },
        {
          name: "authors",
          label: "Authors",
          label_singular: "Author",
          required: false,
          widget: "list",
          summary: "{{fields.name}}",
          field: { label: "Name", name: "name", widget: "string" },
        },
        {
          name: "image",
          label: "Image",
          widget: "image",
          choose_url: false,
          media_folder: "_images",
          pattern: [
            "\\.(jpg|png|jpeg|webp)$",
            "Unsupported image format. Supported formats are jpg, png, webp",
          ],
        },
        {
          name: "dateCreated",
          label: "Created on",
          widget: "datetime",
          format: "YYYY-MM-DD",
          picker_utc: true,
          hint: "When has this item been created on this library?",
        },
        {
          name: "categories",
          label: "Categories",
          required: false,
          widget: "select",
          multiple: true,
          options: CATEGORIES,
        },
        {
          name: "content",
          label: "Content",
          widget: "list",
          hint: "Files (pdf, epub...) for this media item. First item in the list is the main content.",
          min: 1,
          // max is required for min to work :( https://github.com/decaporg/decap-cms/issues/4733
          max: 10,
          summary: "{{fields.url}}",
          fields: [
            {
              name: "url",
              label: "Url",
              widget: "file",
              hint: "Maximum file size is 15 MB.",
              media_library: { config: { max_file_size: 15000000 } },
            },
          ],
        },
        {
          name: "description",
          label: "Description",
          required: false,
          widget: "markdown",
        },
      ],
    },
    {
      name: "media-types",
      label: "Media Types",
      label_singular: "Media Type",
      folder: "src/content/media-types",
      summary: "{{filename}}",
      hide: true,
      format: "json",
      fields: [
        {
          name: "label",
          label: "Label",
          widget: "string",
        },
        {
          name: "icon",
          label: "Icon",
          widget: "string",
          hint: "Find icons on https://pictogrammers.com/library/mdi/. Prefix icon name with 'mdi--'",
        },
        {
          name: "detailsPage",
          label: "Details Page",
          widget: "select",
          options: DETAILS_PAGES,
        },
      ],
    },
  ],
}