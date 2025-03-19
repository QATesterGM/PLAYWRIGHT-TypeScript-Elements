import { expect, test } from '@playwright/test';
import { Logger } from 'tslog';
import { PageManager } from '../../src/pages/page.manager';

const log = new Logger();

test.describe('Page object', () => {
  test.use({ baseURL: 'https://pwts.dev/examples/ui/po/' });

  let pm: PageManager;

  test.beforeEach(({ page }) => {
    pm = new PageManager(page);
  });

  test('Validate page headers are displayed correctly', { tag: '@po' }, async ({}) => {
    log.info('Opening HomePage');
    await pm.homePage.open();
    await expect(pm.homePage.pageHeader()).toBeVisible();

    log.info('Opening reportPage');
    await pm.reportPage.open();
    await expect(pm.reportPage.pageHeader()).toBeVisible();

    log.info('Opening ContactUsPage');
    await pm.contactUsPage.open();
    await expect(pm.contactUsPage.pageHeader()).toBeVisible();
  });

  test('Validate home page title and header', { tag: '@po' }, async ({}) => {
    // Act
    await pm.homePage.open();

    // Assert
    await expect(pm.homePage.pageHeader()).toBeVisible();
    const pageTitle = await pm.homePage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Home');

    expect(await pm.homePage.getBugTitles()).toHaveLength(3);
    await expect(pm.homePage.statBox()).toBeVisible();
    await expect(pm.homePage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
  });

  test('Validate report page title and header', { tag: '@po' }, async ({}) => {
    // Act
    await pm.reportPage.open();

    // Assert
    await expect(pm.reportPage.pageHeader()).toBeVisible();
    const pageTitle = await pm.reportPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Report a Bug');
    await expect(pm.reportPage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
    expect(await pm.reportPage.recentlyFixedBugsComponent.getRecentlyFixedBugs()).toHaveLength(5);
  });

  test('Validate contact us page title and header', { tag: '@po' }, async ({}) => {
    // Act
    await pm.contactUsPage.open();

    // Assert
    await expect(pm.contactUsPage.pageHeader()).toBeVisible();
    const pageTitle = await pm.contactUsPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Contact Us');
  });
});
