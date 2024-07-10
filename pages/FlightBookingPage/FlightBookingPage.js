const { expect } = require("@playwright/test")
const exp = require("constants")

class FlightBookingPage{

    constructor(page){

        this.page = page

        this.logo = this.page.locator('.dyqwmv')
        this.flightHeader = this.page.locator('//div[@data-id="flt-srch-wdgt"]//h2')
        this.fromField = this.page.locator("//span[text()='From']/following::p[text()='Enter city or airport']")
        this.fromInputField = "//span[text()='From']/following::input[1]"
        this.toField = this.page.locator("//*[text()='Enter city or airport']")
        this.toInputField = "//span[text()='To']/following::input"
        this.selectFromList = this.page.locator('//ul[@id="autoSuggest-list"]//li[1]')
        this.ticketClass = this.page.locator('//span[text()="Travellers & Class"]')
        this.economyClass = this.page.locator('ul.sc-12foipm-45 > li:first-child')
        this.premiumEconomyClass = this.page.locator('ul.sc-12foipm-45 > li:nth-child(2)')
        this.buisness = this.page.locator('ul.sc-12foipm-45 >li:nth-child(3)')
        this.firstClass = this.page.locator('ul.sc-12foipm-45 > li:nth-child(4)')
        this.confirmBtn = this.page.locator('//a[@class="sc-12foipm-64 jkgFUQ"]')

        this.forLocation = this.page.locator('//div[@class="sc-12foipm-2 eTBlJr fswFld "]//p[1]')
        this.checkTicketClass = this.page.locator('//p[@class="sc-12foipm-5 bwPbmr"]')

        this.searchFlightBtn = this.page.locator('//span[@class="sc-12foipm-72 ezNmSh"]')

        this.loader = this.page.locator('//*[@class="loaderWrapper appendBottom20"]')
        this.loadingText = this.page.locator('//p[@class="heading appendBottom12"]')

        this.specialOffer = page.locator('//*[@class="sc-12foipm-86 iXowoZ"]')

        this.passanger = page.locator('//*[@class="sc-12foipm-52 jueHCN"]')
        this.increaseNumber = page.locator('//div[@class="sc-12foipm-50 gaoQkJ"]//span[@class="sc-12foipm-51 kZvHQU"][2]')

        this.forex = page.locator('//*[text()="Forex"]')
    }

    async verifyUserOnHomePage(){
        const logoLocator = await this.logo
        await expect(logoLocator).toBeVisible()
        const flightHeadeText = await this.flightHeader
        await expect(flightHeadeText).toBeVisible()
    }

    async enterCityFromBookFlight(cityName){
        await this.fromField.nth(0).click()
        await this.page.fill(this.fromInputField,cityName)
        await this.selectFromList.click()
    }

    async enterCityToBookFlight(cityName){
        await this.page.fill(this.toInputField,cityName)
        await this.selectFromList.click()
   }

   async openTicketInfo(){
    await this.ticketClass.click()
   }

   async selectTicketType(className){
        const ticketClassName = await className.toLowerCase()
        if(ticketClassName === 'economy'){
            await this.economyClass.click()
        }
        if(ticketClassName === 'business'){
            await this.buisness.click()
        }
        if(ticketClassName === 'premium economy'){
            await this.premiumEconomyClass.click()
        }
        if(ticketClassName === 'first class'){
            await this.firstClass.click()
        }
        await this.page.pause()
        await this.confirmBtn.click()
   }

   async validateDetails(index,locator,expectedText){
        const contentText = await locator.nth(index).textContent()
        expect(contentText.toLowerCase()).toContain(expectedText.toLowerCase())
   }

   async verifyDetails(startLocation, destination , ticketClass){
      this.validateDetails(0,this.forLocation,startLocation)
      this.validateDetails(1,this.forLocation,destination)
      this.validateDetails(3,this.checkTicketClass,ticketClass)
    }

    async searchFlight() {
        await this.searchFlightBtn.click()        
    }

    async verifyPageIsLoading(text){
        const loadingPageText = await this.loadingText.textContent()
        expect(loadingPageText.toLowerCase()).toContain(text.toLowerCase())
        
        const loader = await this.loader
        await  expect(loader).toBeVisible()
    }

    async validateTodayDateSelected(todayDate) {    
        const contentElement = await this.page.locator(`//*[normalize-space(text()) = "${todayDate}"]`).textContent()
        expect(contentElement).toContain(todayDate)     
    }

    async selectingOffer(index){
       await this.specialOffer.nth(index).click()
    }

    // 0 - Student 1 - senior citizen 2- armed forces 3 - doctor&Nurses
    async selectSpecialOffer(offerFor){
        if(offerFor=='Student'){
            await this.specialOffer.nth(0).click()
        }
        if(offerFor=='Senior Citizen'){
            await this.specialOffer.nth(1).click()
        }
        if(offerFor=='Armed Forces'){
            await this.specialOffer.nth(2).click()
        }
        if(offerFor=='Doctor'){
            await this.specialOffer.nth(3).click()
        }
    }

    async verifyAvailableClassForSpecialOffer(offer){
        if(offer == "Student" || offer == "Senior Citizen"){
            await this.economyClass.isVisible()
            await expect(this.premiumEconomyClass).toHaveCount(0)
            await expect(this.buisness).toHaveCount(0)
            await expect(this.firstClass).toHaveCount(0)            
        }

        if(offer == 'Doctor' || offer== 'Armed Forces'){
            await this.economyClass.isVisible()
            await this.premiumEconomyClass.isVisible()
            await expect(this.buisness).toHaveCount(0)
            await expect(this.firstClass).toHaveCount(0)
        }
    }

    async increasePassengerNumber(index,totalNumber){
        const currenNumber = await this.passanger.nth(index).textContent()
        const increasePassenger = await this.increaseNumber
        const check = totalNumber - parseInt(currenNumber)
        if(parseInt(check)>0){
            for(let i = 0; i<parseInt(check) ; i++){
                await increasePassenger.nth(index).click()
            }
        }

    }

    async selectPassenger(passanger,totalNumber){
        if(passanger === 'Adults'){
           await this.increasePassengerNumber(0,totalNumber)
        }
        if(passanger === 'Children'){
            await this.increasePassengerNumber(1,totalNumber)
        }
         if(passanger === 'Infant'){
           await this.increasePassengerNumber(2,totalNumber)
        }
    }

    async openForexPage(){
        await this.page.pause()
        await this.forex.click()
    }
}

module.exports = FlightBookingPage