const { expect } = require("@playwright/test")

class BasicFunction{

    constructor(page){
        this.page = page
    }

    async OpenPage(url){
        await this.page.goto(url, { timeout: 60000 })
    }

    async  changeContext() {
        // Listen for the new page (tab) to be opened
      const browser = await chromium.launch();
      const context = await browser.newContext();
      await this.page.goto();
   }

   async openNewPage(context,pageOpenFunction) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            pageOpenFunction() // This should trigger the opening of the new page
        ]);
        await newPage.waitForTimeout(1000)
        return newPage;
    }
    
}

module.exports = BasicFunction
