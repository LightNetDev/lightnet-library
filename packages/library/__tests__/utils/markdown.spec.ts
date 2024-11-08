import { expect, test } from "vitest"

import { markdownToText } from "../../src/utils/markdown"

test("Should remove headers", () => {
  expect(markdownToText("# H1\n## H2 words#")).toBe("H1\nH2 words#")
})

test("Should remove inline modifiers", async () => {
  expect(markdownToText("this is **some bold** and _italic_ text")).toBe(
    "this is some bold and italic text",
  )
})

test("Should remove list", () => {
  expect(markdownToText("- this is **bold**\n- this is normal")).toBe(
    "this is bold\nthis is normal",
  )
})

test("Should convert links", () => {
  expect(markdownToText("some [link](https://link.com?foo)")).toBe("some link")
})

test("Should remove images", () => {
  expect(markdownToText("![a image](my-image.jpg)")).toBe("a image")
})

test("Should remove block quotes", () => {
  expect(markdownToText("> block quote\n>more quote")).toBe(
    "block quote\nmore quote",
  )
})
