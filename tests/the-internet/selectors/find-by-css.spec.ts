import { expect, test } from '@playwright/test';

test.describe('The Internet - locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('find by css=', async ({ page }) => {
    const usernameInput = page.locator('input[name=username]');
    const passwordInput = page.locator('input[name=password]');
    const loginButton = page.locator('button[type=submit]');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('find by inheritance css', async ({ page }) => {
    const loginPageText = page.locator('#content > div.example > h2');
    const usernameInput = page.locator('form > div.row input[name=username]');
    const passwordInput = page.locator('form > div.row input[name=password]');
    const loginButton = page.locator('form > button');

    await expect(loginPageText).toBeVisible();
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });
});
