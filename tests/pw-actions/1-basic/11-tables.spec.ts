import { expect, Locator, test } from '@playwright/test';
import { UserTableModel } from '../../../src/models/user.tables.model';

test.describe('Basic examples', () => {
  const people: UserTableModel[] = [];

  test('tables', { tag: ['@pwbasic', '@tables'] }, async ({ page }) => {
    await page.goto('/tables');

    const rows = await page.locator('table[id=table1] tbody tr').all(); // szukamy wszystkie wiersze

    for (const row of rows) {
      const cells = await row.locator('td').all(); // w pojedynczym wierszu wyciagamy wszystkie komorki

      const lastName: string = await cells[0].innerText(); // tworzymy stałe per komorka
      const firstName: string = await cells[1].innerText();
      const email: string = await cells[2].innerText();
      const due: string = await cells[3].innerText();
      const website: string = await cells[4].innerText();
      const actions: Locator = cells[5];

      const userTableModel: UserTableModel = {
        // przypisujemy wartosci stałych do modelu uzytkownika
        lastName: lastName,
        firstName: firstName,
        email: email,
        due: due,
        website: website,
        actions: actions,
      };

      people.push(userTableModel); // wypychamy obiekt modelu do listy
    }

    const tim = people.find((p) => p.firstName === 'Tim');
    expect(tim).toBeDefined(); // sprawdzamy czy tim istnieje
    expect(tim?.due).toBe('$50.00'); // (znak zapytania jezeli istnieje, wejdz do pola i sprawdz) sprawdzamy czy jego zadluzenie wynosi 50$

    await tim?.actions.getByText('edit').click();
    await expect(page).toHaveURL(/tables#edit/);
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('table - locators', { tag: ['@pwbasic', '@tablewip'] }, async ({ page }) => {
    await page.goto('/tables');

    const table = page.locator('#table1');
    const timConway = table.getByRole('row', { name: 'tconway@earthlink.net' }); //chainowanie elementow
    await timConway.getByRole('link', { name: 'edit' }).click();
    await expect(table).toBeVisible();
    await expect(page).toHaveURL(/tables#edit/);
  });
});
