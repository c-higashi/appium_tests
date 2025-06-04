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
    // アプリ起動を確認
    await driver.pause(5000);
//    //android.view.View[@resource-id="android:id/navigationBarBackground"]
//   //android.widget.ImageView[@content-desc="Universal Studios Japan Logo"]
    const navBarBackground = await driver.$('//android.view.View[@resource-id="android:id/navigationBarBackground"]');
    await navBarBackground.waitForExist({ timeout: 60000 });

    // 右上の”X"ボタンをクリック
    try {
        const closeButton = await driver.$('//android.widget.Button[@content-desc="Close"]');
    　　//Wi-fi上だと実行は早いですが、例えばMobileのテザリング上でテストを実行すると、アプリの起動に１分ほど
       //かかるようです。
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

    // 次の画面への移行を確認
    await driver.pause(5000);

    // "While using the app" をクリック
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

        // "Allow" (通知を) をクリック
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

        // 画面移行を確認
        await driver.pause(3000);

        // "Wait Times Show Schedule"をクリック
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

     // ページに出てくる"Elmo's little drive"に、"min wait"が表示されていることを確認
     const el = await driver.$('//android.widget.Button[contains(@content-desc, "Elmo\'s Little Drive")]');
     const contentDesc = await el.getAttribute('content-desc');
     expect(contentDesc).to.include('min wait');

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
