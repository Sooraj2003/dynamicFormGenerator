import { test, expect } from '@playwright/test';

test('Form validation - Required fields', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app
  await page.click('button[type="submit"]');
  await expect(page.locator('.text-red-500')).toHaveText('This field is required');
});

test('Form submission - Valid data', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="name"]', 'Test User');
  await page.click('button[type="submit"]');
  await expect(page.locator('.text-green-500')).toHaveText('Form submitted successfully');
});
