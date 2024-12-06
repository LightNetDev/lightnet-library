import { expect } from "@playwright/test"

import { lightnetTest } from "./test-utils"

const test = lightnetTest("./fixtures/basics/")

test("Search should have heading section and URL", async ({
  page,
  startLightnet,
}) => {
  const ln = await startLightnet()

  await page.getByLabel("Search").click()
  await expect(page.getByRole("heading", { name: "Search" })).toBeVisible()
  await expect(page).toHaveURL(ln.resolveURL("/en/media"))
})
