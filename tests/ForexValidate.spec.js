const {expect,test} = require('@playwright/test')
const flightBookingPage = require('../pages/FlightBookingPage/FlightBookingPage')
const forexPage = require('../pages/ForexPage/ForexPage')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const loginPage = require('../pages/LoginPage/LoginPage')

const { testData } = require('./testData')
const { chromium } = require('playwright');



test('Forex Screen Test' , async ({page,context})=>{
    const loginpage = new loginPage(page)
    const basicfunction = new basicFunction(page)

    await basicfunction.OpenPage(testData.url)
    await loginpage.closeLoginDialogue()

    const flightbookingpage = new flightBookingPage(page)
    const newPage = await basicfunction.openNewPage(context,async ()=> await flightbookingpage.openForexPage())
    const forexpage = new forexPage(newPage)
    await newPage.waitForTimeout(2000)
    await forexpage.verifyForexPageOpen()

})