import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/dialogs.html');
  });

  test('dialog - ok', { tag: '@pwadvanced' }, async ({ page }) => {
    // default action: accept
    // handler ALWAYS before click!
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('dialog - cancel/ok', { tag: '@pwadvanced' }, async ({ page }) => {
    // default action: cancel
    // handler ALWAYS before click!
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');

    // handler ALWAYS before click!
    page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('dialog - prompt/cancel/ok', { tag: '@pwadvanced' }, async ({ page }) => {
    // default action: cancel
    // handler ALWAYS before click!
    page.once('dialog', async (dialog) => {
      await dialog.accept('hello from JS dialog');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: hello from JS dialog');

    // handler ALWAYS before click!
    page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You canceled the prompt');

    // handler ALWAYS before click!
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered:');
  });
});
