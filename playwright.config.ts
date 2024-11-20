// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    // Base URL of your app
    baseURL: 'http://localhost:3000',  // Change this to your app's URL if necessary
    browserName: 'chromium',          // You can also use 'firefox' or 'webkit'
    headless: true,                   // Set to false if you want to see the browser UI
    screenshot: 'only-on-failure',    // Optionally take screenshots on test failure
    video: 'retain-on-failure',       // Optionally record video of failed tests
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] }, // Run tests on Desktop Chrome
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }, // Run tests on iPhone 12
    },
  ],
});
