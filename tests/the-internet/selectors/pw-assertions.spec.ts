import { expect, test } from '@playwright/test';

test.describe('The Internet - locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('pw assertions', async ({ page }) => {
    const usernameInput = page.getByLabel('Username');
    const passwordInput = page.getByLabel('Password');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await usernameInput.fill('login');
    await passwordInput.fill('password');
    await loginButton.click();

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    await expect(page.locator('#flash')).toHaveClass('flash error');
  });
});
