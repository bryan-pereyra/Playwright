class AmazonPage {

    constructor(page) {
        this.page = page;
        this.searchBar = page.locator('#twotabsearchtextbox');
        this.submitBtn = page.locator('#nav-search-submit-button');
        this.firstItem = page.locator('.s-product-image-container').first();
    };

    async searchItem(item) {
        await this.searchBar.type(item);
        await this.submitBtn.click();
        await this.firstItem.click();
    };

    async storeAndPrintPrice() {
        const price = await this.page.locator('.a-price-whole').first().textContent();
        console.log('Item price: ' + price);
        expect(parseInt(price)).toBeGreaterThan(0);
    }
};

module.exports = { AmazonPage };