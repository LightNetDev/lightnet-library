import { expect } from "@playwright/test"

import { lightnetTest } from "./test-utils"

const test = lightnetTest("./fixtures/basics/")

test("Should have title set", async ({ page, startLightnet }) => {
  await startLightnet()
  await expect(page).toHaveTitle("Basic Test")
})

test("Should have header title that navigates to home page", async ({
  page,
  startLightnet,
}) => {
  const ln = await startLightnet()
  await page.getByRole("link", { name: "Basic Test" }).click()

  await expect(page).toHaveURL(ln.resolveURL("/en/"))
})

test("Should have item section", async ({ page, startLightnet }) => {
  await startLightnet()
  await expect(page.getByRole("heading", { name: "All items" })).toBeVisible()
})

test("Should navigate to search page from main menu", async ({
  page,
  startLightnet,
}) => {
  const ln = await startLightnet()
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "Open Main Menu" })
    .click()
  await page.getByRole("navigation").getByText("Search").click()

  await expect(page).toHaveURL(ln.resolveURL("/en/media"))
})
