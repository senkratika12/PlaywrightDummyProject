const { expect } = require("@playwright/test")

class BasicFunction{

    constructor(page){

        this.page = page
    }

    async OpenPage(url){
        await this.page.goto(url, { timeout: 60000 })
    }
}

module.exports = BasicFunction
