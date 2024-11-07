import { expect } from "@playwright/test"

import { lightnetTest } from "./test-utils"

const test = lightnetTest("./fixtures/basics/")

test("Should have title", async ({ page, lightnet }) => {
  const ln = await lightnet()
  await ln.goto("/")

  await expect(page).toHaveTitle("Basic Test")
})
