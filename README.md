# appium_tests
これは、AppiumとJavaScriptを使った、USJのアンドロイドアプリ用の自動テストです。

# 前提
* USJのアプリは、Emulator上のAndroidに自動でインストールします。

# インストール
注：基本的には、[Appiumのオフィシャルドキュメンテーション](https://appium.io/docs/ja/latest/quickstart/install/) に沿って下さい。
* まず[Home brewをインストール](https://brew.sh/ja/) することをおすすめします。
* コマンド`brew install node`を実行し、nodeとnpmをインストールします。
* コマンド`sudo npm install -g appium` を実行し、Appiumをインストールします。
* アンドロイド用のAppiumドライバー、[UiAutomator2](https://appium.io/docs/ja/latest/quickstart/uiauto2-driver/)を、コマンド `appium driver install uiautomator2` を実行し、インストールします（オフィシャルドキュメンテーションは、英語版しかないようです）。
* アサーションライブラリー、[Chai](https://www.chaijs.com/) を、コマンド `npm instal chai`を実行し、インストールします。
* アプリ上のUIロケーターを表示してくれるツール、Appium inspectorを、コマンド `appium plugin install --source=npm appium-inspector-plugin`を実行して、インストールします。
* [Android Studioをインストール](https://developer.android.com/studio/install?hl=ja) します。

# 設定
* Android Studioを立ち上げ、ツール =>　デバイスマネージャーを開き、Androidの機種を選択。
* PlayStoreから、USJのアプリをインストール　 
 
# テスト実行
