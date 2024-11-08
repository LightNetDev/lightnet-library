import { expect } from "@playwright/test"

import { lightnetTest } from "./test-utils"

const test = lightnetTest("./fixtures/basics/")

test("Should have title set", async ({ page, startLightnet }) => {
  await startLightnet()
  await expect(page).toHaveTitle("Basic Test")
})
