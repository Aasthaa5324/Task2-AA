import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly leftMenuAutomation: Locator;
  readonly createButton: Locator;
  readonly createTaskBotButton: Locator;

  constructor(page: Page) {
    super(page);
    this.leftMenuAutomation = page.getByRole('link', { name: 'Automation' , exact : true});
     this.createButton = page.getByRole('button', { name: 'Create', exact: true });
    this.createTaskBotButton = page.getByRole('button', { name: 'Form Bot…'});
  }

  async navigateToAutomation() {
    await this.waitAndAssertVisible(this.leftMenuAutomation);
    await this.leftMenuAutomation.click();
  }

  async openCreateTaskBot() {
    await this.waitAndAssertVisible(this.createButton);
    await this.createButton.click();
    await this.waitAndAssertVisible(this.createTaskBotButton);
    await this.createTaskBotButton.click();
  }
}