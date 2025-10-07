import { test, expect } from '@playwright/test';

const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

test.describe('Login tests', () => {
  test('valid login redirects to inventory', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', VALID_USER);
    await page.fill('#password', VALID_PASS);
    await page.click('#login-button');
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('invalid login shows error', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'bad_user');
    await page.fill('#password', 'bad_pass');
    await page.click('#login-button');
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface');
    await expect(page).toHaveURL(/.*saucedemo.com.*/);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
