const {test,expect} = require('@playwright/test')
const loginPage = require('../pages/LoginPage/LoginPage')
const basicFunction = require('../pages/CommonFunction/BasicFunction')
const { testData } = require('./testData')
const { verifyData } = require('./verifyData')

test('User is able to see login dialogue', async ({page})=>{

    // await page.goto(testData.url)
    const basicfunction = new basicFunction(page)
    await basicfunction.OpenPage(testData.url)

    const loginpage = new loginPage(page)

    await loginpage.verifyLoginDialogue()

    await loginpage.enterMobileNumber(testData.mobileNumber)

    const invalidMessaeText = await loginpage.verifyInvalidNumberError()
    expect(invalidMessaeText).toContain(verifyData.errorMsg)

    await loginpage.verifyTermsAndConditionVisible(verifyData.verifyText)

    await loginpage.closeLoginDialogue()

})