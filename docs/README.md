# Twishare to Misskey

<div style="text-align: center;">
    <img src="https://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/develop/assets/icon.png" style="height: 15em;">
</div>

![GitHub release (latest by date)](https://img.shields.io/github/v/release/alpaca-honke/twishare-to-misskey?style=flat-square) ![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/fbaifpppndnlbbjcbjdfgbdkoibnipjb?style=flat-square) ![Mozilla Add-on version](https://img.shields.io/amo/v/twishare-to-misskey?style=flat-square) ![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/fbaifpppndnlbbjcbjdfgbdkoibnipjb?label=users%20%28chrome%20web%20store%29&style=flat-square) ![Mozilla Add-on Users](https://img.shields.io/amo/users/twishare-to-misskey?style=flat-square&label=users%20(mozilla%20add-on)) ![Chrome Web Store Rationg](https://img.shields.io/chrome-web-store/stars/fbaifpppndnlbbjcbjdfgbdkoibnipjb?label=rating%20%28chrome%20web%20store%29&style=flat-square) ![GitHub License](https://img.shields.io/github/license/alpaca-honke/twishare-to-misskey?style=flat-square)

**There is an [English version](README-en.md) of this document.**

## 概要

Twitterのシェアボタンから Misskey （またはその派生 SNS）にシェアできるようになる Chrome拡張 です。  
気分で更新します。  

- [公式サイト](https://alpaca-honke.github.io/twishare-to-misskey)  
- [リポジトリ](https://github.com/alpaca-honke/twishare-to-misskey)  
- [Chrome Web Store](https://chrome.google.com/webstore/detail/twishare-to-misskey/fbaifpppndnlbbjcbjdfgbdkoibnipjb)
- [Firefox Addons](https://addons.mozilla.org/ja/firefox/addon/twishare-to-misskey/)

## 機能/特徴

- Twitterのシェアボタンを押したときに確認画面が出てきてTwtterではなくMisskeyにシェアできるか選択できる
    - もちろんキャンセルすればMisskeyではなくTwitterにもシェアできる
- Twitterシェアボタンがなくても右下に出るシェアボタンからMisskeyにシェアできる
    - 動かしてどかすことができる
    - 非表示にすることができる
    - 全画面表示の動画等があるときは隠される
- 右上のポップアップ画面にもシェアボタンがある
- ほぼすべてのMisskey（v12以降）とFirefish（旧Calckey）に対応
- ツイートをシェアする際に、ツイート内容がノートに引用として貼り付けられる
- 特定のサイトでURLにつけられる不要な情報を削除してからシェアする
    - YouTube: トラッキングに関わると思われるIDを削除
    - Twitter: ２種類の不要な情報を削除
- Threadsからシェアする際の予期せぬメンションを回避
- 認証情報を保存しないためセキュリティ的に安全
- 拡張機能の一部の機能と同等の機能を有するブックマークレットを配布

## インストール

### Chrome 互換ブラウザ

（Chrome, Chromium, Edge, Vivaldi, Brave, Opera など）  
Android スマートフォンでは Kiwi Browser などで使用ができます。  

[Chrome ウェブストア](https://chrome.google.com/webstore/detail/twishare-to-misskey/fbaifpppndnlbbjcbjdfgbdkoibnipjb)にアクセスしてインストールしてください。  

### Firefox 互換ブラウザ  

（Firefox など）  

[Firefox Addons](https://addons.mozilla.org/ja/firefox/addon/twishare-to-misskey/)からインストールしてください。  

### Safari

Safari向けには公開していませんが、動くかもしれない...。（Apple製品を持ってないからわかんない）  
（Safariは`browser.storage.sync`非対応らしいので、これを使っているこの拡張は動かないかも）  
[リリースページ](https://github.com/alpaca-honke/twishare-to-misskey/releases)からソースコードを取得して、chromeディレクトリ配下のmanifest.jsonをリポジトリルートにおいて、よしなにやってあげてください。

[Twishare to Misskey Bookamrklet](https://alpaca-honke.github.io/twishare-to-misskey/bookmarklet.html)では、Twishare to Misskeyのシェアボタンの機能を提供するブックマークレットを配布していますので、ぜひご利用ください。

また、にじみす鯖の方（[@wareplus@nijimiss.moe](https://nijimiss.moe/@wareplus)さん）が似た用途のSafariショートカットを公開してくれているようなのでぜひご利用ください！↓  
[作成したショートカットとかCSSとかとか](https://nijimiss.moe/@wareplus/pages/made_by_wareplus)

あと、ちゃんとSafariに対応させられるように、Safari向け拡張機能作れる環境ある方いたら手伝ってくれたら嬉しいです！
（がんばればできないこともなさそうだけど、動作確認が取れないので...。）

### その他

署名済みパッケージなどは[リリースページ](https://github.com/alpaca-honke/twishare-to-misskey/releases)からダウンロードしてください。

公式ではありませんが、非公式でUserScriptがあるようです。（旧バージョンです。これに関するお問い合わせはUserScript公開者さんにお願いします。）
[UserScript](https://greasyfork.org/ja/scripts/466136-twishare-to-misskey)

[Twishare to Misskey Bookamrklet](https://alpaca-honke.github.io/twishare-to-misskey/bookmarklet.html)では、Twishare to Misskeyのシェアボタンの機能を提供するブックマークレットを配布していますので、ぜひご利用ください。

## 使い方

1. インストールしたら、拡張機能の管理画面から、各種権限が許可されているか確認して、適宜許可してください。  
1. 左上の拡張機能の一覧から、Twishare to Misskey のアイコンをクリックすると、シェア先のサーバーを保存する画面がひらくので、入力してください。
（Misskey.io にシェアする場合と二回目以降は不要です。）  
また、その下のトグルスイッチも選択してください。  
![option_ui.png](images/option_ui.png)
1. Twitter シェアボタンを押して、ページ遷移する際に、Misskey にシェアするか聞かれますので、 OK を押すと、 Misskey にシェアされます。  
![popup.png](images/popup.png)
![share.png](images/share.png)
1. 最初にトグルスイッチにチェックを入れた場合は、画面の右下に緑のシェアボタンが出てきます。これを使えば、Twitterのシェアボタンがないページもシェアできます。  
    <img src="images/floating.png" alt="floating.ong" style="border: solid 1px #000">

## プライバシーポリシー

この拡張機能は以下のプライバシーポリシーの下開発・公開されています。
[ブラウザ拡張Twishare to Misskeyにおけるプライバシーポリシー(個人情報保護方針)](https://alpaca-honke.github.io/twishare-to-misskey/privacy.html)

## 質問がある？

まずは[Wiki ページ](https://github.com/alpaca-honke/twishare-to-misskey/wiki/よくある質問)を見てみてください。それでもわからなければ以下の連絡先にご連絡ください。  

## 連絡先

要望・バグ報告などは、あるかっぱ/アルパカ本家まで **気軽に** （ココ重要）お願いします。  

- [もこきー (@alpaca_honke@mkkey.net)](https://mkkey.net/@alpaca_honke)
- [Misskey.io (@alpaca_honke@misskey.io)](https://misskey.io/@alpaca_honke)
- Discord @alpaca_honke
- [Twitter (@alpaca_honke)](https://twitter.com/alpaca_honke)
- [電子メール (akp@ymail.ne.jp)](mailto:akp@ymail.ne.jp)
- [その他](https://alpaca-honke.github.io/)

## 更新履歴

[更新されたときに見るページ](https://alpaca-honke.github.io/twishare-to-misskey/installed.html)みてね

## Contribution

問題の修正、新機能の追加など、開発に協力してくださる方がいましたら大歓迎です。[CONTRIBUTING.md](https://github.com/alpaca-honke/twishare-to-misskey/blob/develop/docs/CONTRIBUTING.md)をご覧ください。  

## Contributors

- [@emtkmkk](https://github.com/emtkmkk)さん
- [@massongit](https://github.com/massongit)さん
- [@rinjugatla](https://github.com/rinjugatla)さん

## 類似サービス

未来情報産業㈱さんから、ウェブサイトに設置するMisskey向けシェアボタンが出ています！ご自身のウェブサイトとかブログある方は是非ご利用ください！  
[Misskey Share](https://misskeyshare.link)

また、僕はこのMisskey Shareを使用してシェアするためのURLを簡単に作成するサービスも作成しました。こちらもぜひ！  
[Misskey Share URL 作成簡単ツール](https://alpaca-honke.github.io/make-misskeyshare-url)

Misskey開発チームから公式にもWebサイトに設置するシェアボタンが公開されました！  
[Misskey Hub 共有フォーム中継サービス](https://misskey-hub.net/ja/docs/for-users/features/share-form/#misskey-hub%E3%81%AE%E5%85%B1%E6%9C%89%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E4%B8%AD%E7%B6%99%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

## ロゴ・画像について

Twishare to Misskeyのロゴ（以下画像1枚目）と、シェアボタンの画像（以下画像2枚目）は、[misskey-dev/assets](https://github.com/misskey-devhttps://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/develop/assets)で公開されている画像に変更を加えたものです。  
CC BY-NC-SAライセンス<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="CC BY-NC-SA" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" style="height:2em;" /></a>
のもとで自由に使用していただけます。  
<img src="https://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/develop/assets/icon.png" style="height: 5em;">  
<img src="https://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/develop/assets/share.png" style="height: 5em;">

なお、カスタム絵文字に使用する際は、余白を切り落とした以下の画像を使用することをおすすめします。
<img src="https://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/develop/docs/images/logo_for_emoji.png" style="height: 5em;">  


## License

この拡張機能は、 MIT ライセンスで頒布されています。詳しくは、[LICENSE](https://github.com/alpaca-honke/twishare-to-misskey/blob/develop/LICENSE) をご覧ください。  

Copyright © 2023-2025 あるかっぱ/アルパカ本家 Alkappa/alpaca-honke, and other contributors
