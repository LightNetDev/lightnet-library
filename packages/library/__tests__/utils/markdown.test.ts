import { expect, test } from "vitest"

import { markdownToPlainText } from "../../src/utils/markdown"

test("Should remove headers", () => {
  expect(markdownToPlainText("# H1\n## H2 words#")).toBe("H1\nH2 words#")
})

test("Should remove inline modifiers", async () => {
  expect(markdownToPlainText("this is **some bold** and _italic_ text")).toBe(
    "this is some bold and italic text",
  )
})

test("Should remove list", () => {
  expect(markdownToPlainText("- this is **bold**\n- this is normal")).toBe(
    "this is bold\nthis is normal",
  )
})

test("Should convert links", () => {
  expect(markdownToPlainText("some [link](https://link.com?foo)")).toBe(
    "some link",
  )
})

test("Should remove images", () => {
  expect(markdownToPlainText("![a image](my-image.jpg)")).toBe("a image")
})
