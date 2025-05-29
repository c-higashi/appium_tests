const {remote} = require('webdriverio');
const { expect } = require('chai');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
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
    const appsItem = await driver.$('//*[@text="Apps"]');
    await appsItem.click();

    const appsPageTitle = await driver.$('id=com.android.settings:id/collapsing_toolbar');
    const pageTitleText = await appsPageTitle.getAttribute('content-desc');

    expect(pageTitleText).to.equal('Apps');
    console.log("✅ Test Passed");
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);