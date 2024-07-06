const { expect } = require("@playwright/test")
const assert = require("assert")

class LoginPage{

    constructor(page){

        this.page = page

        this.login = '//h3[@class="sc-imWYAI isawOS"]'
        this.phoneNumber = '//input[@name="phone"]'
        this.close = '//span[@class="logSprite icClose"]'
        this.tac = '//p[@data-id="terms-condition"]'
        this.invalidNumberError = '//p[@class="sc-jlZhew dSoaQL"]'
    }

    async verifyLoginDialogue(){
        await this.page.waitForSelector(this.login)
        const loginLocator = await this.page.locator(this.login)
        await expect(loginLocator).toBeVisible()
    }

    async closeLoginDialogue(){
        await this.page.waitForSelector(this.close)
        const closeLocator = await this.page.locator(this.close)
        await closeLocator.click()
    }

    async verifyTermsAndConditionVisible(text){
       const tacBtn = await this.page.locator(this.tac).textContent()
       await expect(tacBtn).toContain(text)
    }

    async enterMobileNumber(mobileNumber){
         await this.page.fill(this.phoneNumber,mobileNumber)
    }

    async verifyInvalidNumberError(){
        const errorMessage = await this.page.locator(this.invalidNumberError).textContent()
        return errorMessage
    }
}

module.exports = LoginPage