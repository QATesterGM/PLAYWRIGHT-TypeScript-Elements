import { Page } from "@playwright/test";
import { ContactUsPage } from "./contact-us.page";
import { HomePage } from "./home.page";
import { ReportPage } from "./report.page";

export class PageManager{

  readonly homePage: HomePage;
  readonly reportPage: ReportPage;
  readonly contactUsPage: ContactUsPage;

  constructor(readonly page: Page){
    this.homePage = new HomePage(page);
    this.reportPage = new ReportPage(page);
    this.contactUsPage = new ContactUsPage(page);
  }
}