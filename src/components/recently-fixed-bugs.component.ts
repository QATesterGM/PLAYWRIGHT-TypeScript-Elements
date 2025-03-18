import { Locator, Page } from '@playwright/test';

export class RecentlyFixedBugsComponent {
  constructor(protected page: Page) {
    this.page = page;
  }

  // Locators
  readonly recentlyFixedBox = (): Locator => this.page.locator('div .recent-fixed');

  // Actions
  async getRecentlyFixedBugs(): Promise<string[]> {
    return await this.recentlyFixedBox().locator('li').allInnerTexts();
  }
}
