const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {
    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/locatorspractice/")
});

test.only('First Playwright Test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Get title - Assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("#username").type("User Name");
    await page.locator("[type='password']").type("password");
    await page.locator("#signInBtn").click();
});

