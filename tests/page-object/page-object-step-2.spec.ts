import { expect, test } from '@playwright/test';
import { ContactUsPage } from '../../src/pages/contact-us.page';
import { HomePage } from '../../src/pages/home.page';
import { ReportPage } from '../../src/pages/report.page';

test.describe('Page object', () => {
  test.use({ baseURL: 'https://pwts.dev/examples/ui/po/' });

  test('Validate home page title and header', { tag: '@po' }, async ({ page }) => {
    // Arrange
    const homePage: HomePage = new HomePage(page);

    // Act
    await homePage.open();

    // Assert
    await expect(homePage.pageHeader()).toBeVisible();
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Home');

    expect(await homePage.getBugTitles()).toHaveLength(3);
    await expect(homePage.statBox()).toBeVisible();
    await expect(homePage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
  });

  test('Validate report page title and header', { tag: '@po' }, async ({ page }) => {
    // Arrange
    const reportPage: ReportPage = new ReportPage(page);

    // Act
    await reportPage.open();

    // Assert
    await expect(reportPage.pageHeader()).toBeVisible();
    const pageTitle = await reportPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Report a Bug');
    await expect(reportPage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
    expect(await reportPage.recentlyFixedBugsComponent.getRecentlyFixedBugs()).toHaveLength(5);
  });

  test('Validate contact us page title and header', { tag: '@po' }, async ({ page }) => {
    // Arrange
    const contactUsPage: ContactUsPage = new ContactUsPage(page);

    // Act
    await contactUsPage.open();

    // Assert
    await expect(contactUsPage.pageHeader()).toBeVisible();
    const pageTitle = await contactUsPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Contact Us');
  });
});
