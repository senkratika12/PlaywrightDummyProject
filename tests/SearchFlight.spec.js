const {test,expect} = require('@playwright/test')
const flightBookingPage = require('../pages/FlightBookingPage/FlightBookingPage')
const loginPage = require('../pages/LoginPage/LoginPage')
const { testData } = require('./testData')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const { verifyData } = require('./verifyData')

test('Searching Flight ', async ({page})=>{

    // await page.goto(testData.url)

    const basicfunction = new basicFunction(page)
    await basicfunction.OpenPage(testData.url)

    const flightbookingpage = new flightBookingPage(page)
    const loginpage = new loginPage(page)
    await loginpage.closeLoginDialogue()
    await flightbookingpage.verifyUserOnHomePage()

    await flightbookingpage.enterCityFromBookFlight('Jaipur')
    await flightbookingpage.enterCityToBookFlight("Udaipur")
    await flightbookingpage.selectTicketType('Business')

    await flightbookingpage.verifyDetails('Jaipur','Udaipur','Business')
    await flightbookingpage.searchFlight()
})