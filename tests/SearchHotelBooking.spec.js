const {test,expect} = require('@playwright/test')
const hotelBookingPage = require('../pages/HotelsBookingPage/HotelBookingPage')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const { testData } = require('./testData')
const loginPage = require('../pages/LoginPage/LoginPage')


test('Searching For Hotel', async ({page})=>{
    const basicfunction = new basicFunction(page)
    await basicfunction.OpenPage(testData.url)
    const loginpage = new loginPage(page)
    await loginpage.closeLoginDialogue()

    const hotelbookingpage = new hotelBookingPage(page)
    await hotelbookingpage.selectHotelPage()
    await hotelbookingpage.verifyHotelPageOpen()

    await hotelbookingpage.selectTripType('India')

    await hotelbookingpage.selectPlaceForSearch('Jaipur')
})