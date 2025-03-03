import { expect, test } from '@playwright/test';

test.describe.serial('Advanced examples', () => { // gdy odpalamy testy w serialu to gdy pierwszy nie przejdzie, drugi sie nie odpali
  test('upload', { tag: '@upload' }, async ({ page }) => {
    await page.goto('/upload');

    // 1. Wait for file chooser window
    const uploadPromise = page.waitForEvent('filechooser');
    await page.locator('#file-upload').click();

    // 2. After the file picker dialog is opened, uploadPromise resolves with a FileChooser object.
    const upload = await uploadPromise;
    await upload.setFiles('uploads/pwtsytuyi.txt');
    await page.locator('#file-submit').click();

    await expect(page.getByText('File Uploaded!')).toBeVisible();
  });

  test('download', { tag: '@upload' }, async ({ page }) => {
    await page.goto('/download');

    // 1. Waits for a download event, which occurs when the user clicks a link to initiate a file download.
    const downloadPromise = page.waitForEvent('download');
    await expect(page.getByRole('link', { name: 'pwtsytuyi.txt' })).toBeVisible();
    await page.getByRole('link', { name: 'pwtsytuyi.txt' }).click();

    // 2. Once the download starts, downloadPromise resolves and returns an object representing the downloaded file.
    const download = await downloadPromise;
    await download.saveAs('tmp/download-pwtsytuyi.txt');
  });
});