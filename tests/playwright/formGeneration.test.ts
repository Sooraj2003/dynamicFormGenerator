import { test, expect } from '@playwright/test';

test('Real-time form generation based on schema', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL of the app

  const formTitle = await page.textContent('.text-xl.font-bold');
  expect(formTitle).toBe('Dynamic Form');

  const fields = await page.locator('input, select').count();
  expect(fields).toBeGreaterThan(0); // Assuming there are form fields
});
