import { expect, test } from "vitest"

import { createContentMetadata } from "../../../src/pages/details-page/utils/create-content-metadata"

test("Should create complete content metadata", () => {
  expect(createContentMetadata({ url: "https://some.host/some.pDf" })).toEqual({
    url: "https://some.host/some.pDf",
    canBeDownloaded: false,
    canBeOpened: true,
    downloadLabel: "ln.details.download",
    openLabel: "ln.details.open",
    target: "_blank",
    name: "some",
    isExternal: true,
    extension: "pdf",
  })
})
;[
  {
    url: "https://youtube.com/watch?v=k2exixc",
    expected: {
      canBeDownloaded: false,
      canBeOpened: true,
      target: "_blank",
      name: "youtube.com",
      isExternal: true,
      extension: "link",
    },
  },
  {
    url: "https://some.host/some.pDf",
    expected: {
      canBeDownloaded: false,
      canBeOpened: true,
      target: "_blank",
      name: "some",
      isExternal: true,
      extension: "pdf",
    },
  },
  {
    url: "https://some.host/some.unknown",
    expected: {
      canBeDownloaded: true,
      canBeOpened: false,
      target: "_blank",
      name: "some",
      isExternal: true,
      extension: "unknown",
    },
  },
  {
    url: "/files/my.pdf",
    expected: {
      canBeDownloaded: true,
      canBeOpened: true,
      target: "_self",
      name: "my",
      isExternal: false,
      extension: "pdf",
    },
  },
  {
    url: "/paths/my-id",
    expected: {
      canBeDownloaded: false,
      canBeOpened: true,
      target: "_self",
      name: "my-id",
      isExternal: false,
      extension: "link",
    },
  },
  {
    url: "/files/my.unknown",
    expected: {
      canBeDownloaded: true,
      canBeOpened: false,
      target: "_self",
      name: "my",
      isExternal: false,
      extension: "unknown",
    },
  },
  {
    url: "/some.zip",
    expected: {
      canBeDownloaded: true,
      canBeOpened: false,
      target: "_self",
      name: "some",
      isExternal: false,
      extension: "zip",
    },
  },
].forEach(({ url, expected }) => {
  test(`Should create content metadata for url ${url}`, () => {
    expect(createContentMetadata({ url })).toMatchObject(expected)
  })
})

test("Should override name with input", () => {
  expect(
    createContentMetadata({ url: "/path/to/a.file", name: "My file" }),
  ).toMatchObject({ name: "My file" })
})
