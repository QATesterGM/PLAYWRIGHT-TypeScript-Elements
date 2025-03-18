import { Locator, Page } from '@playwright/test';
import { Logger } from 'tslog';

export abstract class BasePage {
  protected log = new Logger();
  protected url = 'index.html';
  protected pageHeaderText = '';

  constructor(protected page: Page) {
    this.page = page;
  }

  // Locators
  readonly pageHeader = (): Locator => this.page.getByRole('heading', { name: this.pageHeaderText });

  // Actions
  async open(): Promise<void> {
    this.log.info('Opening page: ' + this.url);
    await this.page.goto(this.url);
  }

  async getPageTitle(): Promise<string> {
    this.log.info('Page title: ' + (await this.page.title()));
    return await this.page.title();
  }
}
