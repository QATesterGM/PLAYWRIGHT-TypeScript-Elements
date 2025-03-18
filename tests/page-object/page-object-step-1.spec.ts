import { expect, test } from '@playwright/test';

test.describe('Page object', () => {
  test.use({ baseURL: 'https://pwts.dev/examples/ui/po/'})
  
  test('Validate home page title and header', { tag: '@po' }, async ({ page }) => {
    await page.goto('index.html');
    await expect(page.getByRole('heading', { name: 'Reported Bugs' })).toBeVisible();
    await expect(page).toHaveTitle('BugTracker - Home');
  });

  test('Validate report page title and header', { tag: '@po' }, async ({ page }) => {
    await page.goto('report.html');
    await expect(page.getByRole('heading', { name: 'Report a Bug' })).toBeVisible();
    await expect(page).toHaveTitle('BugTracker - Report a Bug');
  });

  test('Validate contact us page title and header', { tag: '@po' }, async ({ page }) => {
    await page.goto('contact.html');
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
    await expect(page).toHaveTitle('BugTracker - Contact Us');
  });
});
