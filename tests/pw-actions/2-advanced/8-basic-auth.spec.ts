import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  // test('basic auth 1', { tag: '@pwadvanced' }, async ({ page }) => {
  //   await page.goto('/basic_auth');

  //   await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
  // });

  // test('basic auth 2', { tag: '@pwadvanced' }, async () => {
  //   // 1. Create new browser instance
  //   const browser = await chromium.launch({ headless: true });

  //   // 2. Create new browser context
  //   const context = await browser.newContext();

  //   // 3. Open new page in browser
  //   const page = await context.newPage();

  //   await page.goto('/basic_auth');

  //   await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
  // });

  test('basic auth 3', { tag: '@pwadvanced' }, async ({ browser }) => {
    // 2. Create new browser context
    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      },
    });

    // 3. Open new page in browser
    const page = await context.newPage();

    await page.goto('/basic_auth');

    await expect(page.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();
  });
});
