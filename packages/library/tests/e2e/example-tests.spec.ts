import { expect, type Page,test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2000);
})

test('Verify page title', async ({ page }) => {
  const title = await page.title();
  expect(title).toBe('Sk8 Ministries');
});

const switchLanguage = async (page: Page, language: string) => {
  // TODO capturing the locator doesn't work properly, adding dataId didn't help
  await page.getByLabel('Select language').click();
  await page.getByRole('link', { name: language }).click();
  await page.waitForLoadState('load');
};

test('Verify language mutation', async ({ page }) => {
  expect(page.url().endsWith(`/`)).toBe(true);

  await switchLanguage(page, 'Deutsch');
  console.log('Current URL after selecting Deutsch:', page.url());
  expect(page.url().endsWith(`/de/`)).toBe(true);

  await switchLanguage(page, 'English');
  console.log(page.url())
  expect(page.url().endsWith(`/en/`)).toBe(true);
});
