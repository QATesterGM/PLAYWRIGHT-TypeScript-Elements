import { Locator } from "@playwright/test";

export interface UserTableModel {
  lastName: string;
  firstName: string;
  email: string;
  due: string;
  website: string;
  actions: Locator;
}
