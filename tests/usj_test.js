const { remote } = require('webdriverio');
const { expect } = require('chai');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.universalstudios.japanresort',
  'appium:appActivity': 'com.universalstudios.upr_japan.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);

  try {
    // TODO - The test currently fails without pause().  Need to figure out the alternative way
    //        to ensure that the app is up.
    await driver.pause(5000);

    // NOTE: Leaving the following locators for now as they might be used for waitForExist().
    //  //android.view.View[@resource-id="android:id/navigationBarBackground"]
    //  //android.widget.ImageView[@content-desc="Universal Studios Japan Logo"]
    const navBarBackground = await driver.$('//android.view.View[@resource-id="android:id/navigationBarBackground"]');
    await navBarBackground.waitForExist({ timeout: 60000 });

    // Click the "X" on the upper right corner.
    try {
        const closeButton = await driver.$('//android.widget.Button[@content-desc="Close"]');
       // The test currently passes on wi-fi, but it seems to take about a minute to start up the
       // app on other networks, e.g. mobile tethering.
        await closeButton.waitForDisplayed({ timeout: 50000 });

      if (await closeButton.isDisplayed()) {
        await closeButton.click();
        console.log('✅ Close button clicked');
      } else {
        console.log('ℹ️ Close button not visible');
      }
    } catch (err) {
      console.log('ℹ️ Close button not found');
    }

    // Waiting for the next page to be loaded.
    // TODO - Figure out alternative method, e.g., waitForExist().
    await driver.pause(5000);

    // Click "While using the app".
    try{
      const allowButton = await driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]');
      await allowButton.waitForDisplayed({ timeout: 50000 });

      if (await allowButton.isDisplayed()) {
        await allowButton.click();
        console.log('✅ While using the app button clicked');
      } else {
        console.log('ℹ️ While using the app button not visible');
      }
    } catch (err) {
          console.log('ℹ️ While using the app button not found');
    }

    // Click "Allow" (notifications)
    try{
      const allowNotifications = await driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
      await allowNotifications.waitForDisplayed({ timeout: 50000 });

      if (await allowNotifications.isDisplayed()) {
        await allowNotifications.click();
        console.log('✅ Allow (notifications) button clicked');
      } else {
        console.log('ℹ️ Allow (notifications) button not visible');
      }
    } catch (err) {
      console.log('ℹ️ Allow (notifications) button not found');
    }

    // Waiting for the next page to be loaded.
    // TODO - Figure out alternative method, e.g., waitForExist().
    await driver.pause(3000);

    // Click "Wait Times Show Schedule"
    try{
      const waitTimesShowSchedule = await driver.$('//android.widget.Button[normalize-space(@content-desc) = "Wait Times Show Schedule"]');
      await waitTimesShowSchedule.waitForDisplayed({ timeout: 50000 });

      if (await waitTimesShowSchedule.isDisplayed()) {
        await waitTimesShowSchedule.click();
        console.log('✅ Wait Times Show Schedule clicked');
      } else {
        console.log('ℹ️ Wait Times Show Schedule not visible');
      }
    } catch (err) {
      console.log('ℹ️ Wait Times Show Schedule not found');
    }

    // Verify that "Elmo's little drive" has "min wait".
    const el = await driver.$('//android.widget.Button[contains(@content-desc, "Elmo\'s Little Drive")]');
    const contentDesc = await el.getAttribute('content-desc');
    expect(contentDesc).to.include('min wait');

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
