import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/frames/index.html');
  });

  test('iframe with id - frameLocator', { tag: '@pwadvanced' }, async ({ page }) => {
    const iframe = page.frameLocator('#userForm');

    await iframe.locator('#firstName').fill('Lukasz');
    await iframe.locator('#lastName').fill('Testowy');
    await iframe.locator('#email').fill('testowy987@o2.pl');
    await iframe.getByRole('button', { name: 'Zapisz!' }).click();

    await expect(iframe.getByText('Dziękuję za wysłanie formularza!')).toBeVisible();
  });

  test('iframe with css - frameLocator', { tag: '@pwadvanced' }, async ({ page }) => {
    const iframe = page.frameLocator('iframe[name="messageForm"]');

    await iframe.locator('#title').fill('Hello from iframe');
    await iframe.locator('#message').fill('Message from iframe!!!!');
    await iframe.getByRole('button', { name: 'Wyślij wiadomość' }).click();

    await expect(iframe.getByText('Dziękuję za wysłanie wiadomości!')).toBeVisible();
  });

  test('iframe with name - frame', { tag: '@pwadvanced' }, async ({ page }) => {
    const frame = page.frame('messageForm');
    expect(frame).not.toBeNull();

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (frame) {
      await frame.fill('#title', 'Tytuł wiadomości');
      await frame.fill('#message', 'Tresc wiadomości');
      await frame.click('button');

      // eslint-disable-next-line playwright/no-conditional-expect
      await expect(frame.getByText('Dziękuję za wysłanie wiadomości!')).toBeVisible();
    }
  });
});
