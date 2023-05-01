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

test('UI Controls', async ({ page }) => {
    const userNameField = page.locator("#username");
    const passwordField = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const userRadioBtn = page.locator(".radiotextsty").nth(1);
    const termsCheckbox = page.locator("#terms");
    const documentsLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userNameField.type("rahulshettyacademy");
    await passwordField.type("learning");

    await dropdown.selectOption("consult");
    await userRadioBtn.click();
    await page.locator("#okayBtn").click();
    await expect(userRadioBtn).toBeChecked();

    await termsCheckbox.click();
    await expect(termsCheckbox).toBeChecked();
    await termsCheckbox.uncheck();
    expect(await termsCheckbox.isChecked()).toBeFalsy();

    await expect(documentsLink).toHaveAttribute('class', 'blinkingText');
});

test.only('Child windows handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentsLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(documentsLink).toHaveAttribute('class', 'blinkingText');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await documentsLink.click()
    ])

    text = await newPage.locator(".red").textContent();
    console.log(text);
});