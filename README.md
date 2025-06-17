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
