import { expect, test } from '@playwright/test';

// https://playwright.dev/docs/test-timeouts

test.describe('Basic examples', () => {
  test('dynamically loaded elements 1', { tag: ['@pwbasic', '@slow'] }, async ({ page }) => {
    await page.goto('/dynamic_loading/1');

    await page.getByRole('button', { name: 'start' }).click();

    await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({ timeout: 10000 });
  });

  test('dynamically loaded elements 2', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/dynamic_loading/2');

    await page.getByRole('button', { name: 'start' }).click();

    await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({ timeout: 10000 });
  });
});
