import { expect, test } from '@playwright/test';
import { IssueTableModel } from '../../src/models/issue.table.model';

test.describe('Report bug form', () => {
  test('create an issue', { tag: '@e2e' }, async ({ page }) => {
    // Arrange
    const name = 'Jack Sparrow';
    const email = 'jack.sparrow@pwts.dev';
    const description =
      'Can not login to the admin panel. Getting 500 Internal Server Error after the login form is send.';
    const errorCategory = 'Interfejs użytkownika';
    const additionalInformation = 'Is is happening only on Friday!';
    const summaryPage = 'Podsumowanie zgłoszenia błędu';

    await page.goto('https://pwts.dev/examples/ui/issue-form.html');
    await expect(page.locator('#slowInput')).toBeVisible({ timeout: 10_000 });

    // Act
    await page.locator('#nameInput').fill(name);
    await page.locator('#emailInput').fill(email);
    await page.locator('#errorDescription').fill(description);
    await page.locator('#errorCategory').selectOption(errorCategory);
    await page.locator('#checkbox2').check();
    await page.locator('#radio2').click();
    await page.locator('#browserType').selectOption(['chrome', 'firefox']);
    await page.locator('#slowInput').fill(additionalInformation);

    await page.getByRole('button', { name: 'Wyślij zgłoszenie' }).click();

    // Assert
    await expect(page.getByText(summaryPage)).toBeVisible();
    await expect(page.getByText(name)).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText(description)).toBeVisible();
  });

  test('number of critical issues is below 5', { tag: '@e2e' }, async ({ page }) => {
    // Arrange
    const issues: IssueTableModel[] = [];
    const priority = 'Krytyczny';

    await page.goto('https://pwts.dev/examples/ui/issues-table.html');

    // Act
    const rows = await page.locator('table tbody tr').all();

    for (const row of rows) {
      const cells = await row.locator('td').all();

      const issueTableModel: IssueTableModel = {
        title: await cells[0].innerText(),
        description: await cells[1].innerText(),
        priority: await cells[2].innerText(),
        firstName: await cells[3].innerText(),
        lastName: await cells[4].innerText(),
        email: await cells[5].innerText(),
        status: await cells[6].innerText(),
      };

      issues.push(issueTableModel);
    }

    // Assert
    const criticalIssues = issues.filter((issue) => issue.priority === priority);
    expect(criticalIssues.length).toBeLessThan(5);
  });

  test('count all issues with new status', { tag: '@tables' }, async ({ page }) => {
    // Arrange
    const priority = 'Nowe';

    await page.goto('https://pwts.dev/examples/ui/issues-table.html');
    const table = page.locator('table');
    const criticalIssues = await table.getByRole('row', { name: priority }).all();

    // Act
    console.log(criticalIssues.length);
    for (const issue of criticalIssues) {
      await issue.click();
    }

    // Assert
    expect(criticalIssues.length).toBe(9);
  });
});
