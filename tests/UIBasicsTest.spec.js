const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ browser }) => {
    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/locatorspractice/")
});

test('First Playwright Test', async ({ page }) => {
    const userNameField = page.locator("#username");
    const passwordField = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userNameField.type("Wrong Username");
    await passwordField.type("learning");
    await signInBtn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    // type - fill
    await userNameField.fill('');
    await userNameField.fill('rahulshettyacademy');

    await Promise.all(
        [
            page.waitForNavigation(),
            signInBtn.click()
        ]
    );

    // multiple elements same xpath/css
    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(1).textContent());
    const allTitles = await cardTitle.allTextContents(); // it returns an array
    console.log(allTitles);
});