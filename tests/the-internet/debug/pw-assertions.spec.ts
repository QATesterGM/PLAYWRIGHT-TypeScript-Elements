import { expect, test } from '@playwright/test';
import { getRandomName, getRandomPassword } from './debug-utils/debug-random-credentials.utils';

test.describe('The Internet - debug', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('pw debug mode', async ({ page }) => {
    // Arrange
    const username = getRandomName();
    const password = getRandomPassword();

    // Act
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    await expect(page.locator('#flash')).toHaveClass('flash error');
  });
});
