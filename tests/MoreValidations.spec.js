const { test, expect } = require('@playwright/test')

test("PopUp Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Hidden element
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Java/JavaScript Alert PopUp
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    // Mouse Hover
    await page.locator("#mousehover").hover();

    // Handle and Automate frames
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});

test("Screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual Comparision", async ({ page }) => {
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png', {
        maxDiffPixelRatio: 0.25,
    });
});