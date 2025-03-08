import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ADMIN_LOGIN_SESSION, USER_LOGIN_SESSION } from '../../../playwright.config';

test.describe.serial('Advanced examples', () => {
  test.beforeAll(async ({ browser }) => {
    // Save storage state for admin
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    await adminPage.goto('https://pwts.dev/examples/ui/session/index.php');
    await adminPage.fill('#username', 'admin');
    await adminPage.fill('#password', 'admin123');
    await adminPage.getByRole('button', { name: 'Zaloguj się' }).click();
    await adminPage.context().storageState({ path: ADMIN_LOGIN_SESSION });

    // Save storage state for user
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
    await userPage.goto('https://pwts.dev/examples/ui/session/index.php');
    await userPage.fill('#username', 'user');
    await userPage.fill('#password', 'user123');
    await userPage.getByRole('button', { name: 'Zaloguj się' }).click();
    await userPage.context().storageState({ path: USER_LOGIN_SESSION });
  });

  test.afterAll(() => {
    // Clean up the storage state files
    const adminSessionPath = path.resolve(__dirname, ADMIN_LOGIN_SESSION);
    const userSessionPath = path.resolve(__dirname, USER_LOGIN_SESSION);

    if (fs.existsSync(adminSessionPath)) {
      fs.unlinkSync(adminSessionPath);
    }
    if (fs.existsSync(userSessionPath)) {
      fs.unlinkSync(userSessionPath);
    }
  });

  test('load storage state - admin', { tag: '@session' }, async ({ browser }) => {
    const context = await browser.newContext({ storageState: ADMIN_LOGIN_SESSION });
    const page = await context.newPage();

    await page.goto('https://pwts.dev/examples/ui/session/books.php');

    await expect(page.getByText('Jesteś zalogowany jako admin')).toBeVisible();
  });

  test('load storage state - user', { tag: '@session' }, async ({ browser }) => {
    const context = await browser.newContext({ storageState: USER_LOGIN_SESSION });
    const page = await context.newPage();

    await page.goto('https://pwts.dev/examples/ui/session/books.php');

    await expect(page.getByText('Jesteś zalogowany jako użytkownik')).toBeVisible();
  });
});
