import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test('shadow dom', { tag: '@pwadvanced' }, async ({ page }) => {
    await page.goto('/shadowdom');

    await expect(page.locator('span')).toContainText("Let's have some different text!");
    await expect(page.getByRole('list')).toContainText('In a  list!');
  });
});