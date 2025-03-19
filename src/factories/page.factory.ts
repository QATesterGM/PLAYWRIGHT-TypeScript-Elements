import { Page } from '@playwright/test';
import { ContactUsPage } from '../pages/contact-us.page';
import { HomePage } from '../pages/home.page';
import { ReportPage } from '../pages/report.page';
import { BasePage } from '../pages/base.page';

export enum PageType {
  HOME_PAGE = 'HOME',
  REPORT_PAGE = 'REPORT_PAGE',
  CONTACT_US_PAGE = 'CONTACT_US_PAGE',
}

export function createPage(page: Page, type: PageType): BasePage {
  switch (type) {
    case PageType.HOME_PAGE:
      return new HomePage(page);
    case PageType.REPORT_PAGE:
      return new ReportPage(page);
    case PageType.CONTACT_US_PAGE:
      return new ContactUsPage(page);
      default:
        throw new Error(`Unknown page type: ${type as string}`);
  }
}
