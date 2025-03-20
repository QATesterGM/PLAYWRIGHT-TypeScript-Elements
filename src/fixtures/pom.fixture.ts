import { test as base } from '@playwright/test';
import { ILogObj, Logger } from 'tslog';
import { ContactUsPage } from '../pages/contact-us.page';
import { HomePage } from '../pages/home.page';
import { ReportPage } from '../pages/report.page';

interface Pages {
  homePage: HomePage;
  reportPage: ReportPage;
  contactUsPage: ContactUsPage;
}

interface Log {
  log: Logger<ILogObj>;
}

export const test = base.extend<Pages & Log>({
  // eslint-disable-next-line no-empty-pattern
  log: async ({}, use) => {
    await use(new Logger<ILogObj>());
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
});

export { expect } from '@playwright/test';
