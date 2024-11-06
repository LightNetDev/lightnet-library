import { marked } from "marked"

export function markdownToPlainText(markdown?: string) {
  if (!markdown) {
    return markdown
  }
  return (
    markdown
      //headers
      .replaceAll(/^#+ ?/gm, "")
      // lists
      .replaceAll(/^- /gm, "")
      // bold and italics
      .replaceAll(/[*_]/g, "")
      // images
      .replaceAll(/!\[(.*?)\]\(.*?\)/g, (_, imgAlt) => imgAlt)
      // links
      .replaceAll(/\[(.*?)\]\(.*?\)/g, (_, linkLabel) => linkLabel)
  )
}

export function markdownToHtml(markdown?: string) {
  if (!markdown) {
    return markdown
  }
  return marked.parse(markdown)
}
