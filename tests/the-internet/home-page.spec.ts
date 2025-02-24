import { expect, test } from '@playwright/test';

test.describe('The Internet - home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('page has correct title', async ({ page }) => {
    await expect(page.getByText('Welcome to the-internet')).toBeVisible();
  });

  test('page has clickable links', async ({ page }) => {
    await page.getByText('Form Authentication').click();
    await expect(page.getByText('Login Page')).toBeVisible();
  });
});
