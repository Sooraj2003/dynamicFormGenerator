import { test, expect } from '@playwright/test';

test('JSON Validation - Invalid JSON format', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app
  await page.fill('textarea', '{ "invalidJson: true }'); // Invalid JSON
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.text-red-500')).toHaveText('Invalid JSON. Please check the format.');
});

test('JSON Validation - Valid JSON format', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app
  await page.fill('textarea', '{"validJson": true}'); // Valid JSON
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.text-green-500')).toHaveText('JSON is valid!');
});
