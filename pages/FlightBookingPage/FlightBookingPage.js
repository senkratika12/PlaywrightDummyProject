const { expect } = require("@playwright/test")

class FlightBookingPage{

    constructor(page){

        this.page = page

        this.logo = '.dyqwmv'
        this.flightHeader = '//div[@data-id="flt-srch-wdgt"]//h2'
        this.fromField = "//span[text()='From']/following::p[text()='Enter city or airport']"
        this.fromInputField = "//span[text()='From']/following::input[1]"
        this.toField = "//*[text()='Enter city or airport']"
        this.toInputField = "//span[text()='To']/following::input"
        this.selectFromList = '//ul[@id="autoSuggest-list"]//li[1]'
        this.ticketClass = '//span[text()="Travellers & Class"]'
        this.economyClass = 'ul.sc-12foipm-45 > li:first-child'
        this.premiumEconomyClass = 'ul.sc-12foipm-45 > li:nth-child(2)'
        this.buisness = 'ul.sc-12foipm-45 >li:nth-child(3)'
        this.firstClass = 'ul.sc-12foipm-45 > li:nth-child(4)'
        this.confirmBtn = '//a[@class="sc-12foipm-64 jkgFUQ"]'

        this.forLocation = '//div[@class="sc-12foipm-2 eTBlJr fswFld "]//p[1]'
        this.checkTicketClass = '//p[@class="sc-12foipm-5 bwPbmr"]'

        this.searchFlightBtn = '//span[@class="sc-12foipm-72 ezNmSh"]'

        this.loader = '//*[@class="loaderWrapper appendBottom20"]'
        this.loadingText = '//p[@class="heading appendBottom12"]'
    }

    async verifyUserOnHomePage(){
        const logoLocator = await this.page.locator(this.logo)
        await expect(logoLocator).toBeVisible()
        const flightHeadeText = await this.page.locator(this.flightHeader)
        await expect(flightHeadeText).toBeVisible()
    }

    async enterCityFromBookFlight(cityName){
         const fromBookFlight = await this.page.locator(this.fromField).nth(0)
         await  fromBookFlight.click()
         await this.page.fill(this.fromInputField,cityName)
         const firstOption = await this.page.locator(this.selectFromList)
         await firstOption.click()
    }

    async enterCityToBookFlight(cityName){
        await this.page.fill(this.toInputField,cityName)
        const firstOption = await this.page.locator(this.selectFromList)
        await firstOption.click()
   }

   async selectTicketType(className){
        const ticketClass = await this.page.locator(this.ticketClass)
        await ticketClass.click()
        const economyTicketClass= await this.page.locator(this.economyClass)
        const buisnessTicketClass= await this.page.locator(this.buisness)

        const premiumEconomyTicketClass= await this.page.locator(this.premiumEconomyClass)
        const firstClassTicketClass= await this.page.locator(this.firstClass)
        const ticketClassName = await className.toLowerCase()
        if(ticketClassName === 'economy'){
            await economyTicketClass.click()
        }
        if(ticketClassName === 'business'){
            await buisnessTicketClass.click()
        }
        if(ticketClassName === 'premium economy'){
            await premiumEconomyTicketClass.click()
        }
        if(ticketClassName === 'first class'){
            await firstClassTicketClass.click()
        }
        await this.page.locator(this.confirmBtn).click()
   }

   async validateDetails(index,locator,expectedText){
        const contentText = await this.page.locator(locator).nth(index).textContent()
        expect(contentText.toLowerCase()).toContain(expectedText.toLowerCase())
   }

   async verifyDetails(startLocation, destination , ticketClass){
        if (startLocation){
          this.validateDetails(0,this.forLocation,startLocation)
        }
        if (destination){
            this.validateDetails(1,this.forLocation,destination)
        }
        if (ticketClass){
            this.validateDetails(3,this.checkTicketClass,ticketClass)
        }
    }

    async searchFlight() {
        await this.page.locator(this.searchFlightBtn).click()        
    }

    async verifyPageIsLoading(text){
        const loadingPageText = await this.page.locator(this.loadingText).textContent()
        expect(loadingPageText.toLowerCase()).toContain(text.toLowerCase())
        
        const loader = await this.page.locator(this.loader)
        await  expect(loader).toBeVisible()
    }
}

module.exports = FlightBookingPage