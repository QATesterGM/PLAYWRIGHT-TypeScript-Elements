import { expect, test } from '../../src/fixtures/pom.fixture';

test.describe('Page object', () => {
  test.use({ baseURL: 'https://pwts.dev/examples/ui/po/' });

  test(
    'Validate page headers are displayed correctly',
    { tag: '@po5' },
    async ({ homePage, reportPage, contactUsPage, log }) => {
      log.info('Opening HomePage');
      await homePage.open();
      await expect(homePage.pageHeader()).toBeVisible();

      log.info('Opening reportPage');
      await reportPage.open();
      await expect(reportPage.pageHeader()).toBeVisible();

      log.info('Opening ContactUsPage');
      await contactUsPage.open();
      await expect(contactUsPage.pageHeader()).toBeVisible();
    },
  );

  test('Validate home page title and header', { tag: '@po5' }, async ({ homePage }) => {
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

  test('Validate report page title and header', { tag: '@po5' }, async ({ reportPage }) => {
    // Act
    await reportPage.open();

    // Assert
    await expect(reportPage.pageHeader()).toBeVisible();
    const pageTitle = await reportPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Report a Bug');
    await expect(reportPage.recentlyFixedBugsComponent.recentlyFixedBox()).toBeVisible();
    expect(await reportPage.recentlyFixedBugsComponent.getRecentlyFixedBugs()).toHaveLength(5);
  });

  test('Validate contact us page title and header', { tag: '@po5' }, async ({ contactUsPage }) => {
    // Act
    await contactUsPage.open();

    // Assert
    await expect(contactUsPage.pageHeader()).toBeVisible();
    const pageTitle = await contactUsPage.getPageTitle();
    expect(pageTitle).toEqual('BugTracker - Contact Us');
  });
});
