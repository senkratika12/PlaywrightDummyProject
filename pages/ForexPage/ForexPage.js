const {expect} = require('@playwright/test')

class forexPage{
    constructor(page){
        this.page = page
        this.header = this.page.locator('//h5[@class="TextStylesstyle__H5TagStyle-tdz7k0-4 cuvyaU"]')
    }
    
    async verifyForexPageOpen() {
        await this.page.waitForSelector('//h5[@class="TextStylesstyle__H5TagStyle-tdz7k0-4 cuvyaU"]', { timeout: 5000 });
        expect(await this.header.isVisible()).toBeTruthy();
    }
}

module.exports = forexPage