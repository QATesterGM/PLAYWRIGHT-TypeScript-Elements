import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  test('screenshot on page', { tag: '@pwadvanced' }, async ({ page }) => {
    await page.screenshot({ path: 'tmp/login-screenshot.png', fullPage: true });

    await expect(page).toHaveTitle(/The Internet/);
  });

  test('screenshot on locator', { tag: '@pwadvanced' }, async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your username is invalid!')).toBeVisible();

    await page.locator('#flash-messages').screenshot({ path: 'tmp/flash-messages-screenshot.png' });
    await expect(page).toHaveTitle(/The Internet/);
  });
});