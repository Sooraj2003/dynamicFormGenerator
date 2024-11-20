import { test, expect } from '@playwright/test';

test('Error when submitting invalid JSON', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app
  await page.fill('textarea', '{ "invalidJson: true }');
  await page.click('button:has-text("Submit")');
  await expect(page.locator('.text-red-500')).toHaveText('Invalid JSON. Please check the format.');
});
