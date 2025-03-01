import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  test('dynamically loaded controls - remove/add checkbox', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/dynamic_controls');

    await expect(page.locator('#checkbox')).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('#checkbox')).toBeHidden();
  });

  test('dynamically loaded controls - enable/disable input', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/dynamic_controls');

    await expect(page.locator('input[type=text]')).toBeDisabled();
    await page.getByRole('button', { name: 'Enable' }).click();
    await expect(page.locator('input[type=text]')).toBeEnabled();
  });
});
