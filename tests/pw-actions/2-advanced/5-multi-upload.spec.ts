import { expect, test } from '@playwright/test';

test.describe('Advanced examples', () => {
  test('multi upload', { tag: '@pwadvanced' }, async ({ page }) => {
    await page.goto('https://pwts.dev/examples/ui/multiupload.html');

    const uploadPromise = page.waitForEvent('filechooser');
    await page.locator('#fileInput').click();

    const upload = await uploadPromise;
    await upload.setFiles(['uploads/pwtsytuyi.txt', 'uploads/pwtsytuyi2.txt']);

    await expect(page.getByText('pwtsytuyi.txt')).toBeVisible();
    await expect(page.getByText('pwtsytuyi2.txt')).toBeVisible();

    await page.locator('#clearAllButton').click();
    await expect(page.getByText('pwtsytuyi.txt')).toBeHidden();
    await expect(page.getByText('pwtsytuyi2.txt')).toBeHidden();
  });
});
