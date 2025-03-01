import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  test('radio button', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('https://testpages.herokuapp.com/styled/basic-html-form-test.html');

    await expect(page.locator('input[value=rd2]')).toBeChecked();
    await page.locator('input[value=rd1]').check();
    await expect(page.locator('input[value=rd2]')).not.toBeChecked();
    await expect(page.locator('input[value=rd1]')).toBeChecked();

    await page.getByRole('button', { name: 'submit' }).click();

    await expect(page.getByText('rd1')).toBeVisible();
  });
});