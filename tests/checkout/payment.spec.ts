import { test, expect } from '@playwright/test';

test.describe('Payment and order summary', () => {
  test('verify totals and complete order', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const firstItem = page.locator('.inventory_item').first();
    const name = await firstItem.locator('.inventory_item_name').innerText();
    const priceText = await firstItem.locator('.inventory_item_price').innerText();

    await firstItem.locator('button').click();
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '2000');
    await page.click('[data-test="continue"]');

    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(name);
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total');
    await expect(page.locator('.summary_total_label')).toContainText('Total');
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.complete-header')).toContainText(/THANK YOU/i);
  });
});
