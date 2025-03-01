import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  test('dropdown - single select', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/dropdown');

    // select option by value
    await page.locator('#dropdown').selectOption('1');

    // select option by label
    await page.locator('#dropdown').selectOption('Option 2');

    await expect(page).toHaveTitle(/The Internet/);
  });

  test('dropdown - multiple select', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

    // select option by value
    await page.locator('select[multiple=multiple]').selectOption(['ms1', 'ms2']);

    // select option by label
    await page.locator('select[multiple=multiple]').selectOption(['Selection Item 3', 'Selection Item 4']);

    await expect(page).toHaveTitle(/HTML/);
  });
});
