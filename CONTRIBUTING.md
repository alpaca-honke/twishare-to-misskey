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

Issueを開いてから作業を行ってください。（僕とかと同じ作業で重複するのを防ぐため。）その際、上記のIssueの項目を守ってください。

### 作業中

基本的にChrome向けに修正、追加を行ってください。（Firefoxのみで発生している不具合の修正などはその限りではない）ただ、Firefoxに適用する際に留意すべき点がある際には、コード内にコメントを残しておいてください。
Firefoxに適用ができない（Chrome独自の機能など。`chrome` ネームスペースを `browser` に置き換えるだけで済むものは除く）コミットは二行目以降にその旨を書いてください。

README.mdやimagesディレクトリ配下を編集する際は、コードの編集とコミットを分けてください。また、そのコミットメッセージの二行目（またはそれ以降）に、その旨を書いてください。

### Pull Request

`develop` ブランチにPRを行ってください。その際、上記作業中の項目にある留意点に該当する場合は書いていただけるとありがたいです。

Firefox向けにPRを作成する際は、`develop_firefox` ブランチに行ってください。

## ディレクトリ構造

```
/
|- assets/ 拡張機能内部で使用するファイルを格納
|    |- share.png 右下のフローティングシェアボタンの画像
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

|- CONTRIBUTING.md この文書
|- LICENSE MITライセンス
|- README.md 説明
|- manifest.json マニフェストファイル
```

## ブランチ構造

[ブランチ構造](https://github.com/alpaca-honke/twishare-to-misskey/wiki/ブランチ構造)をご覧ください。
