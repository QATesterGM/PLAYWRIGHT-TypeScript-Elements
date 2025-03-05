import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test('multi windows', { tag: '@pwadvanced' }, async ({ browser }) => {
    const contextOne = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin',
      },
    });

    const pageOne = await contextOne.newPage();
    await pageOne.goto('/basic_auth');
    await expect(pageOne.getByText('Congratulations! You must have the proper credentials.')).toBeVisible();

    const contextTwo = await browser.newContext({
      httpCredentials: {
        username: 'admin123',
        password: 'admin123',
      },
    });

    const pageTwo = await contextTwo.newPage();
    await pageTwo.goto('/basic_auth');
    await expect(pageTwo.getByText('Not authorized')).toBeVisible();
  });

  test('multi tabs', { tag: '@pwadvanced' }, async ({ context }) => {
    const pageOne = await context.newPage();
    const pageTwo = await context.newPage();

    await pageOne.goto('/login');
    await expect(pageOne.getByText('Login Page')).toBeVisible();

    await pageTwo.goto('/challenging_dom');
    await expect(pageTwo.getByText('Challenging DOM')).toBeVisible();
  });
});