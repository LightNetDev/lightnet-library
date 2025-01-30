import { marked } from "marked"

/**
 * Remove markdown syntax and return plain text.
 *
 * @param markdown string
 * @returns plain text
 */
export function markdownToText(markdown?: string) {
  if (!markdown) {
    return markdown
  }
  return (
    markdown
      //headers
      .replaceAll(/^#+ ?/gm, "")
      // lists
      .replaceAll(/^- /gm, "")
      // block quotes
      .replaceAll(/^>+ ?/gm, "")
      // bold and italics
      .replaceAll(/[*_]/g, "")
      // images
      .replaceAll(/!\[(.*?)\]\(.*?\)/g, (_, imgAlt) => imgAlt)
      // links
      .replaceAll(/\[(.*?)\]\(.*?\)/g, (_, linkLabel) => linkLabel)
  )
}

/**
 * Converts markdown to a html string
 *
 * @param markdown string
 * @returns html
 */
export function markdownToHtml(markdown?: string) {
  if (!markdown) {
    return markdown
  }
  return marked.parse(markdown)
}
