import { Page } from '@playwright/test';
import { RecentlyFixedBugsComponent } from '../components/recently-fixed-bugs.component';
import { BasePage } from './base.page';

export class ReportPage extends BasePage {
  protected readonly url = 'report.html';
  protected readonly pageHeaderText = 'Report a Bug';

  // Components
  readonly recentlyFixedBugsComponent: RecentlyFixedBugsComponent;

  constructor(page: Page) {
    super(page);
    this.recentlyFixedBugsComponent = new RecentlyFixedBugsComponent(page);
  }
}
