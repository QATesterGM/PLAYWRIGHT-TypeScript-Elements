/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, test } from '@playwright/test';

test.describe('The Internet - locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('find by text', async ({ page }) => {
    const loginButton = page.getByText('Login').last();
    const usernameInput = page.locator('id=username');
    const passwordInput = page.locator('id=password');

    await expect(loginButton).toBeVisible();
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});
