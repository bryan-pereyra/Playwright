const { test } = require('@playwright/test');

test.only('Client App Practice', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').type('Iamking@000');
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
});