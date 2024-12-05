import { expect } from "@playwright/test"

import { lightnetTest } from "./test-utils"

const test = lightnetTest("./fixtures/basics/")

test("Should have item section", async ({ page, startLightnet }) => {
  const ln = await startLightnet()
  await page.goto(ln.resolveURL("/en/media"), { timeout: 60000 })

  await expect(page.getByRole("heading", { name: "Search" })).toBeVisible()
})
