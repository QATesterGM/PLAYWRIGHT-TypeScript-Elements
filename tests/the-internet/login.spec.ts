import { expect, test } from '@playwright/test';

test.describe('The Internet - home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Internet/);
  });

  test('login with valid credentials', async ({ page }) => {
    // Arrange - Given
    const username = 'tomsmith';
    const password = 'SuperSecretPassword!!';
    const expectedText = 'You logged into a secure area!';

    // Act - When
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.getByText('Login').last().click();

    // Assert - Then
    await expect(page.getByText(expectedText)).toBeVisible();
  });
});
