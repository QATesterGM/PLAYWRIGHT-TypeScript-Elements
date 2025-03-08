import { expect, test } from '@playwright/test';
import { ADMIN_LOGIN_SESSION, USER_LOGIN_SESSION } from '../../../playwright.config';

test.describe.serial('Advanced examples', () => {
  test('save storage state - admin', { tag: '@session' }, async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/session/index.php');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.context().storageState({ path: ADMIN_LOGIN_SESSION });

    await expect(page.getByText('Jesteś zalogowany jako admin')).toBeVisible();
  });

  test('load storage state - admin', { tag: '@session' }, async ({ browser }) => {
    const context = await browser.newContext({ storageState: ADMIN_LOGIN_SESSION });
    const page = await context.newPage();

    await page.goto('https://pwts.dev/examples/ui/session/books.php');
    await expect(page.getByText('Jesteś zalogowany jako admin')).toBeVisible();
  });

  test('save storage state - user', { tag: '@session' }, async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/session/index.php');
    await page.fill('#username', 'user');
    await page.fill('#password', 'user123');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();

    await page.context().storageState({ path: USER_LOGIN_SESSION });

    await expect(page.getByText('Jesteś zalogowany jako użytkownik: user')).toBeVisible();
  });

  test('load storage state - user', { tag: '@session' }, async ({ browser }) => {
    const context = await browser.newContext({ storageState: USER_LOGIN_SESSION });
    const page = await context.newPage();

    await page.goto('https://pwts.dev/examples/ui/session/books.php');
    await expect(page.getByText('Jesteś zalogowany jako użytkownik: user')).toBeVisible();
  });
});