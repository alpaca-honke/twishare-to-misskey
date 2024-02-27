# Twishare to Misskeyがインストール/更新されました！🎉  

- 新規でインストールした方：[リポジトリ](https://github.com/alpaca-honke/twishare-to-misskey)で使い方をご確認ください！  
- 以前からインストールしてある方：以下の更新履歴を見て、新機能をご確認ください！  
- まだインストールしていない方：[リポジトリ](https://github.com/alpaca-honke/twishare-to-misskey)を見て、ぜひインストールしてください！  

## お知らせ

- 【 **右下のシェアボタンが移動可能になりました！** 】
右下のシェアボタンを動かせるようにしてほしいとの要望があったため、ドラッグまたはスワイプでどかせるようになりました。
ページを再読込みすることで右下に戻ります。

- 【 **拡張機能をインストールしなくてもシェアできるブックマークレットを作るサイトについて** 】
[拡張機能をインストールしなくてもシェアできるブックマークレットを作るサイト](https://alpaca-honke.github.io/twishare-to-misskey/bookmarklet.html)を作成しました。
ぜひご利用ください。
Twishare to Misskeyをインストールできないブラウザでもぜひご利用ください。
なんかわかんなかったら気軽に聞いてね

- 【 **協力をお願いしたいです** 】
    - **現在Chrome版(v0.4.0)にのみついている、ポップアップ（サーバー名とか設定するやつ）のシェアボタンをFirefox版にもつけたいです。** （[isssue #45](https://github.com/alpaca-honke/twishare-to-misskey/issues/45)）  
    現状では、Chromeでは動きますが、なぜかFirefoxでは動作しません。
    協力してくれる方いましたら、上記リンクからWIPを取得し、動作確認をしていただいて、もし原因に心当たりがありましたらお知らせいただけたらありがたいです...！
    - **英語に対応したので、誤訳があったらお知らせください。**

## 更新履歴

※記載の日付は、リリース日（そのバージョンが完成した日）で、ストアに公開された日とは異なる場合があります。
リリースはされたがまだ更新がされていない場合があります。その場合はインストールされたバージョンと最新バージョンが異なりますので、拡張機能の画面からバージョンをご確認ください。  

### v0.4.0 (2023.09.30) ※Chromeのみ。v0.3.0の変更も含みます。

#### General

- 拡張機能ポップアップにもシェアボタンを追加

### v0.3.0 (2023.09.30) ※Firefoxのみ

#### General

- 拡張機能が提供するシェアボタンをドラッグで移動可能に
- 表示言語を英語に対応
- YouTubeとTwitterのURLについている、トラッキングに関わる（と思われる）IDを削除してからシェアするよう変更
- [拡張機能をインストールしなくてもシェアできるブックマークレットを作るサイト](bookmarklet.html)を作成
- 軽微な修正

#### Documentation

- 一部の文書の英語版を追加

### v0.2.6 (2023.09.01)

#### General

- Calckeyとの表示を削除し、その辺を全部「Misskey系」とした
- Twitterシェアボタンからシェアする際にメンションが削除されなかった場合、エスケープするように修正
- Twitterの画面からツイートをシェアする際に関する修正
    - URL末尾にパラメータやハッシュがついていた場合に正常に動作しなかったのを修正
    - 絵文字が表示されなかったのを修正

#### Documentation

- 各種ドキュメントをgh-pagesブランチから/docsディレクトリに移動
- 軽微な修正

### v0.2.5 (2023.07.19)

#### General

- 動画などを全画面表示にした際に右下のシェアボタンを隠すよう変更
- 設定画面から保存ボタンを消し、変更された時点で自動保存するよう変更
- ツイートをシェアする際に、MFMの引用ブロックとしてノートにシェアするように変更

### v0.2.4 (2023.07.08)

#### General

- Twitterシェアボタンからシェアする際にツイート画面のタブが残る問題を修正

#### Other

- Chrome版もFirefox版も同一のコードを実行するよう変更

### v0.2.3 (2023.06.16)

#### General

- シェアするURLに関する仕様の変更（使い方や見た目の挙動は変わりません）
- 設定画面にバージョン番号を表示
- 軽微な修正

### v0.2.2 (2023.06.06)

#### General

- 軽微な修正

#### for Firefox

- manifest v3 に変更

### v0.2.1 (2023/05/31)

#### General

- Misskey/Calckyで右下のシェアボタンを非表示にできる設定を追加
- 任意のサイトで右下のシェアボタンを非表示にできる設定を追加
- サーバー名の設定画面のUIを変更
- 軽微な修正

### v0.2.0 (2023/05/23)

#### General

- 軽微な修正
- Twitterシェアボタンのないページでもシェアできるようボタンを追加

### v0.1.1 (2023/05/16)

#### General

- 保存ボタンで保存したときに「保存されました！」と表示されない問題を修正 (Issue[#3](https://github.com/alpaca-honke/twishare-to-misskey/issues/3))
- 更新時にこのページを表示する挙動を追加
- 軽微な修正

### v0.1.0 (2023/05/10)

#### General

- 任意のMisskeyサーバーにシェアできるよう拡張
    - 拡張機能のアイコンを押したら出てくるメニューから設定できます。
- 軽微な修正

#### Firefox向け

- Firefox Addonsに公開

### v0.0.2 (2023/04/29)

#### Chrome向け

- ハッシュタグが正常にタグ付けされない問題の修正
- Chromeウェブストアに公開

***

## 連絡先

- mkkey.net [@alpaca-honke@mkkey.net](https://mkkey.net/@alpaca_honke)
- Misskey.io [@alpaca_honke@misskey.io](https://misskey.io/@alpaca_honke)  
- ぼすきー [@alpaca_honke@voskey.icalo.net](https://voskey.icalo.net/@alpaca_honke)
- のえすきー [@alpaca_honke@misskey.noellab.jp](https://misskey.noellab.jp/@alpaca_honke)
- Discord @alpaca_honke
- Twitter [@alpaca_honke](https://twitter.com/alpaca_honke)  
- メール（Googleフォームからご連絡ください） [GoogleForms](https://docs.google.com/forms/d/e/1FAIpQLSdRuzAmGEqDV4RRd-70JKXD0lAHE6xjEp8Qp5-Jfut-ysQMYQ/viewform)  
- ホームページ的ななにか [https://alpaca-honke.github.io/](https://alpaca-hoke.github.io/)  

Copyright © 2023-2024 あるかっぱ/アルパカ本家 Alkappa/alpaca-honke, and other contributors
