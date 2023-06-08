const { Given, When, Then } = require('@cucumber/cucumber');

Given('I visited Amazon.com', async function () {
    await this.page.goto('https://www.amazon.com.mx/');
});

When('search for {string}', async function (item) {
    const onAmazon = this.poManager.getAmazonPage();
    await onAmazon.searchItem(item);
});

Then('I store and print its price', async function () {
    const onAmazon = this.poManager.getAmazonPage();
    await onAmazon.storeAndPrintPrice();
});