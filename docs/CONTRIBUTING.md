# Contribution Guide

このブラウザ拡張に対するコントリビュートのガイドラインです。あまり堅苦しいものではないですが、コントリビュート前に必ずお読みください。（見る人いるのかなぁ）  

## Issues

Issueはいつでも大歓迎です。以下のことを守って作成してください。  

- Issueを作成する前に同様の内容のものがないか確認して、重複のないようにしてください。
- Issueのタイトルは、内容を簡単に要約したものにしてください。
- 不具合に関するIssueを作成する場合は、不具合の内容と発生条件などを詳細に書いてください。
- 要望に関するIssueは、要望の内容などを詳細に書いてください。
- 適切なラベルをつけてください。
    - 最低限`Type:`からはじまるものいずれかと`Status: Open: pending`（すぐに取り掛かる場合は`Status: Open: in progress`）をつけてください。
- 質問はIssueに書かないでください。質問がある場合は気軽にご連絡ください。（内容によってはよくある質問に載せるかも）

その他のIssueも大歓迎です

なお、基本的にこちらからIssueのアサインは行いません。

## コードの修正、追加

以下のことに従って行ってください。

### 作業前

新規Issue、もしくは既存のIssueに「私がやります」的なコメントをしてから作業を行ってください。（僕とかと同じ作業で重複するのを防ぐため。）
その際、上記のIssueの項目を守ってください。

### 作業中

- セキュリティを担保できないため、アクセストークンを含む認証情報などの機密情報を拡張機能内に保存するような変更は行わないでください。
- ポップアップなどで表示される文字列は、HTMLに直接書き込まず、_localesディレクトリ内の各messages.jsonから変更してください。
また、HTMLを読みやすくするため、HTMLにはダミーの文字列を書いておいていただけると嬉しいです。
- ChromeとWebExtensions（Firefoxなど）向けの両方が同じコードで動いてることに留意してください。  
- switch_browser.shというシェルスクリプト、switch_browser.batというバッチファイルがリポジトリルートに同梱されています。
ブラウザでテストする際などにご利用ください。
    - 実行権限を付与して、引数に`chrome`と指定するとChrome向けのmanifest.jsonがルートに設置されます。
    - `firefox`を指定するとFirefox向けのmanifest.jsonが設置されます。
    - 何も指定しないとルートから削除されます。

なお、docsディレクトリ配下とswitch_browserスクリプトはウェブストアに提出するパッケージやリリースパッケージには含まれません。
また、`chrome`ディレクトリや`webext`ディレクトリ配下のmanifest.jsonファイルはウェブストアに提出する際にルートに移動されます。

### Pull Request

`develop` ブランチにPRを行ってください。説明を詳しめに書いていただけると嬉しいです。

## ディレクトリ構造

```
├── .gitignore
├── _locales ロケールごとの翻訳
│   ├── en
│   │   └── messages.json 英語の翻訳済み文字列
│   └── ja
│        └── messages.json 日本語の翻訳済み文字列
├── assets 拡張機能内部で使用するファイルを格納
│   ├── icon.png 右下のフローティングシェアボタンの画像
│   └── share.png 高画質のTwishare to Misskeyのアイコン（画質がいいとは言ってない）
├── chrome Chromeのみで使用するファイル
│   └── manifest.json マニフェストファイル
├── docs ドキュメント群
│   ├── CONTRIBUTING.md この文書
│   ├── README.md 説明
│   ├── images README内で使用する画像
│   │   ├── floating.png
│   │   ├── option_ui.png
│   │   ├── popup.png
│   │   └── share.png
│   ├── installed.md インストール時に表示されるページ
│   ├── notebutton.webp MisskeyShareのノートボタン画像
│   └── privacy.md プライバシーポリシー
├── firefox Firefox版でのみ使用するファイル
│   └── manifest.json マニフェストファイル
├── icons 拡張機能のアイコン
│   ├── 128.png
│   ├── 16.png
│   └── 48.png
├── js_and_css content_scriptsとbackground(worker)に関するファイル
│   ├── allpages.css 全ページに適用するCSS
│   ├── allpages.js 全ページに適用するJavaScript
│   ├── background.js Workerとしてバックグラウンドで動作するJavaScript
│   └── on_twitter_intent.js https://twitter.com/intent/tweetなどで動作するJavaScript
├── options option_uiとpopupに関するファイル
│   ├── options.css
│   ├── options.html
│   └── options.js
├── switch_browser.bat マニフェストファイルを設置するシェルスクリプト(Windows用)
└── switch_browser.sh マニフェストファイルを設置するシェルスクリプト(Linux用)
```
