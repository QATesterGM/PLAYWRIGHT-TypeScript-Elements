import { expect, test } from '@playwright/test';
import { ADMIN_LOGIN_SESSION, USER_LOGIN_SESSION } from '../../../playwright.config';

const baseUrl = 'https://pwts.dev/examples/ui/session/books.php';

test.describe('Advanced examples', () => {
  test.use({ storageState: ADMIN_LOGIN_SESSION });

  test('load storage state - admin', { tag: '@session6' }, async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.getByText('Jesteś zalogowany jako admin')).toBeVisible();
  });
});

test.describe('Advanced examples', () => {
  test.use({ storageState: USER_LOGIN_SESSION });

  test('load storage state - user', { tag: '@session6' }, async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.getByText('Jesteś zalogowany jako użytkownik')).toBeVisible();
  });
});