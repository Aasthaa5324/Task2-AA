import { Locator, expect, type Page as PlaywrightPage } from '@playwright/test';

export class BasePage {
  readonly page: PlaywrightPage;

  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto("https://community.cloud.automationanywhere.digital/#/login");
  }

  async waitAndAssertVisible(locator: Locator, timeout = 10000) {
    await expect(locator).toBeVisible({ timeout });
  }

 
  async fillAndAssert(selectorOrLocator: string | Locator, value: string) {
    let input: Locator;
    if (typeof selectorOrLocator === 'string') {
      input = this.page.locator(selectorOrLocator);
    } else {
      input = selectorOrLocator;
    }
    await input.fill(value);
    await expect(input).toHaveValue(value);
  }

  async assertText(locator: Locator, expectedText: string | RegExp) {
    await expect(locator).toContainText(expectedText);
  }
}

export class DashboardPage extends BasePage {
 
  readonly automationLink: Locator;

  constructor(page: PlaywrightPage) {
    super(page);
    
   
    this.automationLink = page.getByRole('link', { name: 'Automation' });
  }

  async navigateToAutomation() {
    await this.waitAndAssertVisible(this.automationLink);
    await this.automationLink.click();
  }
}