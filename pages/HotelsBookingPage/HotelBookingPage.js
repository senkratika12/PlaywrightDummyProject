const {expect} = require('@playwright/test')

class HotelBookingPage{
    
    constructor(page){
        this.page = page

        this.selectHotel = "//span[text()='Hotels']"
        this.hotelPageHeader = '//h1[@class="HomePagestyles__HomePageTitle-sc-s8m7jv-2 bDwhYv"]'

        this.countryType = '//input[@name="CountryType"]'
        this.inputField= '//input[@class="HomePageAutosuggeststyles__SearchInputStyles-sc-1v6s32j-1 dPHRio"]'

        this.selectFromList = '//ul[@id="downshift-1-menu"]//li'

    }

    async selectHotelPage(){
        await this.page.locator(this.selectHotel).click()
    }

    async verifyHotelPageOpen(){
        const hotelPageHeader = await this.page.locator(this.hotelPageHeader)
        await expect(hotelPageHeader).toBeVisible()
    }

    async selectTripType(country){
        const tripType = await this.page.locator(this.countryType)
        if(country === 'India'){
            await tripType.nth(0).click()
        }
        if(country === 'International'){
            await tripType.nth(1).click()
        }
    }

    async selectPlaceForSearch(city){
        await this.page.fill(this.inputField,city)
        await this.page.locator(this.selectFromList).nth(0).click()
    }
}

module.exports = HotelBookingPage