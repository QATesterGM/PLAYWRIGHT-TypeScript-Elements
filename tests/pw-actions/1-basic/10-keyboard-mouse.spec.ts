import { expect, test } from '@playwright/test';

// https://playwright.dev/docs/api/class-keyboard

test.describe('Basic examples', () => {
  test('keyboard press', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/key_presses');

    await page.locator('#target').click();
    await page.keyboard.press('Backspace');

    await expect(page.getByText('You entered: BACK_SPACE')).toBeVisible();
  });

  test('context menu', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/context_menu');

    // dialog handler
    // page.on('dialog', (dialog) => page.waitForTimeout(1000).then(() => dialog.accept()));

    await page.mouse.click(250, 250, { button: 'right' });

    await expect(page).toHaveTitle(/The Internet/);
  });

  test('drag and drop', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/drag_and_drop');

    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    await source.dragTo(target);

    await expect(page).toHaveTitle(/The Internet/);
  });
});