import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { RecentlyFixedBugsComponent } from '../components/recently-fixed-bugs.component';

export class HomePage extends BasePage {
  protected readonly url = 'index.html';
  protected readonly pageHeaderText = 'Reported Bugs';

  // Components
  readonly recentlyFixedBugsComponent: RecentlyFixedBugsComponent;

  constructor(page: Page){
    super(page);
    this.recentlyFixedBugsComponent = new RecentlyFixedBugsComponent(page)
  }

  // Locators
  readonly statBox = (): Locator => this.page.locator('div .stats-box');

  // Action
  async getBugTitles(): Promise<string[]> {
    return await this.page.locator('main li a').allInnerTexts();
  }
}
