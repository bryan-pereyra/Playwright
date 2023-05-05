const { test, expect } = require('@playwright/test')

test.only("PopUp Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Hidden element
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Java/JavaScript Alert PopUp
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //Mouse Hover
    await page.locator("#mousehover").hover();
})