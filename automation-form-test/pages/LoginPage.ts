import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    
    this.usernameInput = page.locator('#\\:r2\\:');
    this.passwordInput = page.locator('#\\:r3\\:');

    
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async login() {
    await this.goto('/#/login');

    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill("asthaaaadwi@gmail.com");

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(process.env.PASSWORD!);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();

    
    await this.page.waitForURL(/repository|dashboard|home/, {
      timeout: 15000,
    });

    console.log('Login successful');
  }
}