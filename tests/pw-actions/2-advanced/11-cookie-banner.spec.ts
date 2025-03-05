import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test('cookie banner', { tag: '@cookie' }, async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/cookies.html');

    const acceptCookieButton = page.getByRole('button', { name: 'Accept' });

    await page.addLocatorHandler(acceptCookieButton, async () => {
      await acceptCookieButton.click();
      await expect(acceptCookieButton).toBeHidden();
    });

    await page.locator('#sender-name').pressSequentially('Jack Sparrow', { delay: 200 });
    await page
      .locator('#sender-address')
      .pressSequentially('born on a pirate ship during a typhoon in the Indian Ocean', { delay: 200 });

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveTitle(/Cookie/);
  });
});