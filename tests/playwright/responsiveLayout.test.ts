import { test, expect } from '@playwright/test';

test('Responsive layout on mobile', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport size
  const form = await page.locator('form');
  await expect(form).toHaveClass(/w-full/); // Check if form is full width on mobile
});

test('Responsive layout on desktop', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 1024, height: 768 }); // Desktop viewport size
  const form = await page.locator('form');
  await expect(form).toHaveClass('lg:w-1/2'); // Check if form is half width on large screens

});
