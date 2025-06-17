# Appium test for Android app
This is a UI automated test for Universal Studios Japan's Android app, developed using Appium and
JavaScript. The app displays the wait times for each ride, and the test is designed to verify that 
this information appears correctly.  Currently, the test is written for the English version of 
the app and ensures that wait times are displayed as expected for each ride.

# Pre-requisite
* The app needs to be manually installed on the Android Emulator.

# Installation
I basically followed the [Official Appium documentation](https://appium.io/docs/en/2.5/quickstart/install/).
Following are some additional steps you need to take (which are not quite covered in the official doc).
* [Installing Homebrew](https://brew.sh/) is recommended.
* Install node by executing `brew install node` on the command line.
* Install Appium by executing `sudo npm install -g appium`.
* Install the Appium driver for Android by executing `appium driver install uiautomator2`.
* Install the Assertion library [Chai](https://www.chaijs.com/) by executing `npm instal chai`.
* In order to look up the UI locators on the app, install Appium Inspector by executing  `appium plugin install --source=npm appium-inspector-plugin`.
* [In stall Android Studio](https://developer.android.com/studio?gad_source=1&gad_campaignid=21831783525&gbraid=0AAAAAC-IOZkJYSDVzOOH-iUrP3ksxf12R&gclid=CjwKCAjwpMTCBhA-EiwA_-MsmWLeDRJSOm1xcrIP4FYRRmRfPkOWtQLL_8w9b83ZRGeJZ1PePM6vORoCV2kQAvD_BwE&gclsrc=aw.ds)

# Test Environment
Start up Android Studio and do the following:
1. On the menu go to Tool => Device Manager.
2. Select the Android model that you'd like to run the tests against.  Android emulator will appear on the right side of Android Studio.
3. Manually install the USJ app from PlayStore on the emulator

# Test Execution

