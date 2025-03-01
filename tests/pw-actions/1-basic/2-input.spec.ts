import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  test('input', { tag: ['@pwbasic', '@wip'] }, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'michael');

    // { force: true } - bypass the actionability checks, defaults to false.
    // Playwright docs - https://playwright.dev/docs/actionability
    // await page.fill('#username', 'michael', { force: true });

    // Method deprecated
    // await page.type('#username', 'michael');

    await page.locator('#password').pressSequentially('password', { delay: 1000 }); // wpisywanie literke po literce, zastepuje metode 'type'

    await expect(page.getByText('Login Page')).toBeVisible();
  });
});
