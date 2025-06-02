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
    // Pause to allow the app to load
    await driver.pause(5000);

    // Try to find the "Close" button and click it if visible
    try {
        const closeButton = await driver.$('//android.widget.Button[@content-desc="Close"]');
      if (await closeButton.isDisplayed()) {
        await closeButton.click();
        console.log('✅ Close button clicked');
      } else {
        console.log('ℹ️ Close button not visible');
      }
    } catch (err) {
      console.log('ℹ️ Close button not found');
    }

    // Pause to ensure transition
    await driver.pause(5000);

    //  Click While using the app
    try{
    const allowButton = await driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]');
          if (await allowButton.isDisplayed()) {
            await allowButton.click();
            console.log('✅ While using the app button clicked');
          } else {
            console.log('ℹ️ While using the app button not visible');
          }
        } catch (err) {
          console.log('ℹ️ While using the app button not found');
        }

        // Click Allow (notifications) button
        try{
              const allowNotifications = await driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]');
              if (await allowNotifications.isDisplayed()) {
                await allowNotifications.click();
                console.log('✅ Allow (notifications) button clicked');
              } else {
                console.log('ℹ️ Allow (notifications) button not visible');
              }
            } catch (err) {
              console.log('ℹ️ Allow (notifications) button not found');
        }

            // Pause to ensure transition
            await driver.pause(3000);

        // Now find and click "Wait Times Show Schedule"
        try{
              const waitTimesShowSchedule = await driver.$('//android.widget.Button[normalize-space(@content-desc) = "Wait Times Show Schedule"]');
              if (await waitTimesShowSchedule.isDisplayed()) {
                await waitTimesShowSchedule.click();
                console.log('✅ Wait Times Show Schedule clicked');
              } else {
                console.log('ℹ️ Wait Times Show Schedule not visible');
              }
            } catch (err) {
              console.log('ℹ️ Wait Times Show Schedule not found');
        }

    // Optional assertion example
    // const title = await driver.$('your-title-selector');
    // expect(await title.getText()).to.equal('Expected Title');

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
