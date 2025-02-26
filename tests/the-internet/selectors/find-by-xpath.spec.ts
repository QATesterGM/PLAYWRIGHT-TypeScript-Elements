/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@playwright/test';

test.describe('The Internet - locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('find by xpath', async ({ page }) => {
    const usernameInput = page.locator('//input[@name="username"]');
    const passwordInput = page.locator('//input[@name="password"]');
    const loginButton = page.locator('//button[@type="submit"]');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('find by inheritance xpath', async ({ page }) => {
    const usernameInput = page.locator('//form/div/div/input[@name="username"]');
    const passwordInput = page.locator('//form/div/div/input[@name="password"]');
    const loginButton = page.locator('//form/button/i[contains(text(), "Login")]');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });
});
