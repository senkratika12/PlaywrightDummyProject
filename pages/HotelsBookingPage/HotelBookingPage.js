const {expect} = require('@playwright/test')

class HotelBookingPage{
    
    constructor(page){
        this.page = page

        this.selectHotel = "//span[text()='Hotels']"
        this.hotelPageHeader = '//h1[@class="HomePagestyles__HomePageTitle-sc-s8m7jv-2 bDwhYv"]'
    }

    async selectHotelPage(){
        await this.page.locator(this.selectHotel).click()
    }

    async verifyHotelPageOpen(){
        const hotelPageHeader = await this.page.locator(this.hotelPageHeader)
        await expect(hotelPageHeader).toBeVisible()
    }
}

module.exports = HotelBookingPage