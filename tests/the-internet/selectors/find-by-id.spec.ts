import { expect, test } from '@playwright/test';

test.describe('The Internet - locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('find by id=', async ({ page }) => {
    const usernameInput = page.locator('id=username');
    const passwordInput = page.locator('id=password');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('find by #id', async ({ page }) => {
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
