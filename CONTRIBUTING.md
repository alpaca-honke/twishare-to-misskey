# Contribution Guide

このブラウザ拡張に対するコントリビュートのガイドラインです。コントリビュート前に必ずお読みください。（見る人いるのかなぁ）  

## Issues

Issueはいつでも大歓迎です。以下のことを守って作成してください。  

- Issueを作成する前に同様の内容のものがないか確認して、重複のないようにしてください。
- Issueのタイトルは、内容を簡単に要約したものにしてください。
- 不具合に関するIssueを作成する場合は、不具合の内容と発生条件などを詳細に書いてください。
- 要望に関するIssueは、要望の内容などを詳細に書いてください。
- 質問はIssueに書かないでください。質問がある場合は気軽にご連絡ください。（内容によってはよくある質問に載せるかも）

その他のIssueも大歓迎です

なお、基本的にこちらからIssueのアサインは行いません。

## コードの修正、追加

以下のことに従って行ってください。

### 作業前

新規Issue、もしくは既存のIssueに「私がやります」的なコメントをしてから作業を行ってください。（僕とかと同じ作業で重複するのを防ぐため。）
その際、上記のIssueの項目を守ってください。

### 作業中

ChromeとWebExtensions（Firefoxなど）向けの両方が同じコードで動いてることに留意してください。  
switch_browser.shというシェルスクリプト、switch_browser.batというバッチファイルがリポジトリルートに同梱されています。
ブラウザでテストする際などにご利用ください。
- 実行権限を付与して、引数に`chrome`と指定するとChrome向けのmanifest.jsonがルートに設置されます。
- `firefox`を指定するとFirefox向けのmanifest.jsonが設置されます。
- 何も指定しないとルートから削除されます。

なお、README.mdとimagesディレクトリ配下、及びCONTRIBUTING.mdとswitch_browserスクリプトはウェブストアに提出するパッケージやリリースパッケージには含まれません。
また、`chrome`ディレクトリや`webext`ディレクトリ配下のmanifest.jsonファイルはウェブストアに提出する際にルートに移動されます。

### Pull Request

`develop` ブランチにPRを行ってください。説明を詳しめに書いていただけると嬉しいです。

## ディレクトリ構造

```
/
|- assets/ 拡張機能内部で使用するファイルを格納
|    |- share.png 右下のフローティングシェアボタンの画像
|    |- icon.png 高画質のTwishare to Misskeyのアイコン（画質がいいとは言ってない）
|
|- icons/ 拡張機能のアイコン
|    |- 16.png
|    |- 48.png
|    |- 128.png
|
|- images/ README内で使用する画像（以下省略）
|
|- js_and_css/ content_scriptsとbackground(worker)に関するファイル
|    |- allpages.css 全ページに適用するCSS
|    |- allpages.js 全ページに適用するJavaScript
|    |- background.js Workerとしてバックグラウンドで動作するJavaScript
|    |- on_twitter_intent.js https://twitter.com/intent/tweetで動作するJavaScript
|
|- options/ option_uiとpopupに関するファイル
|    |- options.css オプション画面のCSS
|    |- options.html オプション画面のHTML
|    |- options.js オプション画面のJavaScript
|
|- chrome/ Chromeのみで使用するファイル
|    |- manifest.json マニフェストファイル
|
|- webext/ WebExtensions版でのみ使用するファイル
|    |- manifest.json マニフェストファイル
|
|- CONTRIBUTING.md この文書
|- LICENSE MITライセンス
|- README.md 説明
|- switch_browser.bat マニフェストファイルを設置するシェルスクリプト(Windows用)
|- switch_browser.sh マニフェストファイルを設置するシェルスクリプト(Linux用)
|-.gitignore Git管理から除外するファイルのリスト
```
