import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  // Open playwright.config.ts
  // add video: 'on' to use section
  // use: {
  //  video: 'on',
  //},

  test('video', { tag: '@video' }, async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'michael');
    await page.locator('#password').pressSequentially('password');
    await page.locator('button').click();

    await expect(page.getByText('Your username is invalid!')).toBeVisible();
  });
});