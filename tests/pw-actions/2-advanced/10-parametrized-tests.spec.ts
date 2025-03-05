import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  const testData = [
    { login: 'tomsmith', password: 'SuperSecretPassword!', expected: 'You logged into a secure area!' },
    { login: 'tomsmith123', password: 'SuperSecretPassword!', expected: 'Your username is invalid!' },
    { login: 'tomsmith', password: 'SuperSecretPassword!123', expected: 'Your password is invalid!' },
  ];

  testData.forEach(({ login, password, expected }) => {
    test(`test with params: ${login} + ${password}`, { tag: '@params' }, async ({ page }) => {
      await page.goto('/login');
      await page.fill('#username', login);
      await page.fill('#password', password);
      await page.click('button');
      await expect(page.getByText(expected)).toBeVisible();
    });
  });
});