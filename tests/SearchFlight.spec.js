const {test,expect} = require('@playwright/test')
const flightBookingPage = require('../pages/FlightBookingPage/FlightBookingPage')
const loginPage = require('../pages/LoginPage/LoginPage')
const { testData } = require('./testData')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const calenderUtilities = require('../utilities/calenderUtility')
const { verifyData } = require('./verifyData')

test('Searching Flight ', async ({page})=>{

    // await page.goto(testData.url)

    const basicfunction = new basicFunction(page)
    await basicfunction.OpenPage(testData.url)

    const flightbookingpage = new flightBookingPage(page)
    const loginpage = new loginPage(page)
    const calenderutilities = new calenderUtilities()
    const todayDate = await calenderutilities.TodayDate()
    await loginpage.closeLoginDialogue()
    await flightbookingpage.verifyUserOnHomePage()

    await flightbookingpage.enterCityFromBookFlight(testData.startLocation)
    await flightbookingpage.enterCityToBookFlight(testData.destinationLocation)
    await flightbookingpage.openTicketInfo()
    await flightbookingpage.selectPassenger('Adults',2)
    await flightbookingpage.selectPassenger('Children',1)
    await flightbookingpage.selectPassenger('Infant',1)

    await flightbookingpage.selectTicketType(testData.ticketClass)

    await flightbookingpage.verifyDetails(testData.startLocation,testData.destinationLocation,testData.ticketClass)
    await flightbookingpage.validateTodayDateSelected(todayDate)
    await flightbookingpage.searchFlight()
})