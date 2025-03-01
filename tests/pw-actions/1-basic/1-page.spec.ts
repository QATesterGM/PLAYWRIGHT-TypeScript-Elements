import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  // 1. page is loaded to the test as a fixture - isolated page for this test run
  // 2. page can call different methods: goto(), toHaveTitle()
  // 3. waitUntil - domcontentloaded, load, networkidle, commit
  // domcontentloaded- (html is loaded but css and js not yet) - consider operation to be finished when the DOMContentLoaded event is fired.
  // load - (html, css and js - everything is loaded) - consider operation to be finished when the load event is fired.
  // networkidle - **DISCOURAGED** consider operation to be finished when there are no network connections for
  // at least 500 ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  // commit - consider operation to be finished when network response is received and the document started loading.

  test('page', { tag: '@pwbasic' }, async ({ page }) => {
    // Navigation
    await page.goto('https://pwts.dev');
    // await page.reload();
    // await page.goBack();
    // await page.goForward();
    await expect(page.getByText('context')).toBeVisible();

    // Locator
    page.locator('#id');
    page.getByRole('button', { name: 'Submit' });

    // Actions
    await page.click('#button');
    await page.click('#button', { clickCount: 10 });
    await page.click('#addToCart', { button: 'right' });
    await page.click('#addToCart', { modifiers: ['Alt', 'Control'] });
    await page.dblclick('#addToCart');
    await page.check('#checkbox');
    await page.uncheck('#checkbox');
    await page.fill('#email', 'bartek@test.dev');

    // Assertions
    await expect(page.getByText('context')).toBeVisible();
  });
});