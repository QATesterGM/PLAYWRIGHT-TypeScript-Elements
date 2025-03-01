import { expect, test } from '@playwright/test';

test.describe('Basic examples', () => {
  test('text', { tag: '@pwbasic' }, async ({ page }) => {
    await page.goto('/notification_message_rendered');

    // 1. innerHTML() - returns the HTML content of the element, tags and text
    const innerHtml = await page.innerHTML('#content');
    expect(innerHtml).toContain('Notification Message');

    // 2. innerText() - returns the visible text of the element
    // It will be your default choice for checking the text content
    const innerText = await page.innerText('#content');
    expect(innerText).toContain('Notification Message');

    // 3. textContent() - returns all the text content of the element, visible and hidden
    const textContent = await page.textContent('#content');
    expect(textContent).toContain('Notification Message');

    // 4. getAttribute() - returns the value of the attribute
    const getAttribute = await page.getAttribute('#content', 'class');
    expect(getAttribute).toContain('large-12');

    // 5. getAttribute('value') - returns the value of the input field
    // 6. getAttribute('class') - returns the value of the class attribute
    // 7. getAttribute('href') - returns the value of the href attribute
    // 8. getAttribute('src') - returns the value of the src attribute
    // 9. getAttribute('style') - returns the value of the style attribute
    // 10. getAttribute('title') - returns the value of the title attribute
    // 11. getAttribute('alt') - returns the value of the alt attribute
    // 12. getAttribute('role') - returns the value of the role attribute

    await expect(page.getByText('Some rudimentary examples include')).toBeVisible();
  });
});