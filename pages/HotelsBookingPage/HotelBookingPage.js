const {expect} = require('@playwright/test')

class HotelBookingPage{
    
    constructor(page){
        this.page = page

        this.selectHotel = this.page.locator("//span[text()='Hotels']")
        this.hotelPageHeader =this.page.locator('//h1[@class="HomePagestyles__HomePageTitle-sc-s8m7jv-2 bDwhYv"]'
)
        this.countryType = this.page.locator('//input[@name="CountryType"]')
        this.inputField= '//input[@class="HomePageAutosuggeststyles__SearchInputStyles-sc-1v6s32j-1 dPHRio"]'

        this.selectFromList = this.page.locator('//ul[@id="downshift-1-menu"]//li')

        this.searchBtn = this.page.locator('//button[@data-testid="searchHotelBtn"]')

    }

    async selectHotelPage(){
        await this.selectHotel.click()
    }

    async verifyHotelPageOpen(){
        const hotelPageHeader = await this.hotelPageHeader
        await expect(hotelPageHeader).toBeVisible()
    }

    async selectTripType(country){
        const tripType = await this.countryType
        if(country === 'India'){
            await tripType.nth(0).click()
        }
        if(country === 'International'){
            await tripType.nth(1).click()
        }
    }

    async selectPlaceForSearch(city){
        await this.page.fill(this.inputField,city)
        await this.selectFromList.nth(0).click()
    }

    async confirmSearchHotel(){
        await this.searchBtn.click()

        await this.page.pause()
    }
}

module.exports = HotelBookingPage