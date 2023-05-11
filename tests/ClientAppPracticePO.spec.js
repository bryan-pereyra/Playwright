const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Page Object Client App Practice', async ({ page }) => {
    const userName = "play.wright@mailinator.com";
    const password = "Mypass@123";
    const productName = 'adidas original';

    // PO Implementation
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();

    await loginPage.goTo();
    await loginPage.validLogin(userName, password);

    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    await ordersReviewPage.searchCountryAndSelect("mex", "Mexico");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});