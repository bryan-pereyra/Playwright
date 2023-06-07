const { AmazonPage } = require('./AmazonPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.amazonPage = new AmazonPage(this.page);
    };

    getAmazonPage() {
        return this.amazonPage;
    };
};

module.exports = { POManager };