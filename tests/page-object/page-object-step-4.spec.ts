import { expect, test } from '@playwright/test';
import { Logger } from 'tslog';
import { createPage, PageType } from '../../src/factories/page.factory';
import { ContactUsPage } from '../../src/pages/contact-us.page';
import { HomePage } from '../../src/pages/home.page';
import { ReportPage } from '../../src/pages/report.page';

const log = new Logger();

test.describe('Page object', () => {
  test.use({ baseURL: 'https://pwts.dev/examples/ui/po/' });

  let homePage: HomePage;
  let contactUsPage: ContactUsPage;
  let reportPage: ReportPage;

  test.beforeEach(({ page }) => {
    homePage = createPage(page, PageType.HOME_PAGE) as HomePage;
    contactUsPage = createPage(page, PageType.CONTACT_US_PAGE) as ContactUsPage;
    reportPage = createPage(page, PageType.REPORT_PAGE) as ReportPage;
  });

  test('Validate page headers are displayed correctly', { tag: '@po' }, async ({}) => {
    log.info('Opening HomePage');
    await homePage.open();
    await expect(homePage.pageHeader()).toBeVisible();

    log.info('Opening reportPage');
    await reportPage.open();
    await expect(reportPage.pageHeader()).toBeVisible();

    log.info('Opening ContactUsPage');
    await contactUsPage.open();
    await expect(contactUsPage.pageHeader()).toBeVisible();
  });

  test('Validate home page title and header', { tag: '@po' }, async ({}) => {
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

  test('Validate report page title and header', { tag: '@po' }, async ({}) => {
    // Act
    await reportPage.open();

    // Assert
    await expect(reportPage.pageHeader()).toBeVisible();
    const pageTitle = await reportPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Report a Bug');
    await expect(reportPage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
    expect(await reportPage.recentlyFixedBugsComponent.getRecentlyFixedBugs()).toHaveLength(5);
  });

  test('Validate contact us page title and header', { tag: '@po' }, async ({}) => {
    // Act
    await contactUsPage.open();

    // Assert
    await expect(contactUsPage.pageHeader()).toBeVisible();
    const pageTitle = await contactUsPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Contact Us');
  });
});
