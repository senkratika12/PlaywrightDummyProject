const {test,expect} = require('@playwright/test')
const flightBookingPage = require('../pages/FlightBookingPage/FlightBookingPage')
const loginPage = require('../pages/LoginPage/LoginPage')
const { testData } = require('./testData')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const { verifyData } = require('./verifyData')

test('Verify Special Offer ', async ({page})=>{

    // await page.goto(testData.url)

    const basicfunction = new basicFunction(page)
    await basicfunction.OpenPage(testData.url)

    const flightbookingpage = new flightBookingPage(page)
    const loginpage = new loginPage(page)
    await loginpage.closeLoginDialogue()

    await flightbookingpage.selectSpecialOffer("Student")
    await flightbookingpage.openTicketInfo()
    await flightbookingpage.verifyAvailableClassForSpecialOffer("Student")

})