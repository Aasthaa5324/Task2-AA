import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://community.cloud.automationanywhere.digital',
    trace: 'on-first-retry',  // Debug traces
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      headless: false,  // Set true for CI/prod
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});