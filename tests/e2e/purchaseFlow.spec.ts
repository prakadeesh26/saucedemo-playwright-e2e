import { test, expect } from '@playwright/test';

test('End-to-end purchase flow for single product', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory.html/);

  const first = page.locator('.inventory_item').first();
  const name = await first.locator('.inventory_item_name').innerText();
  const price = await first.locator('.inventory_item_price').innerText();

  await first.locator('button').click();
  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(name);
  await expect(page.locator('.cart_item .inventory_item_price')).toHaveText(price);

  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '2000');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');

  await expect(page).toHaveURL(/.*checkout-complete.html/);
  await expect(page.locator('.complete-header')).toContainText(/THANK YOU/i);
});
