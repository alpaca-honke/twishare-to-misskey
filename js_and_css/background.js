//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === 'undefined') {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

browser.runtime.onInstalled.addListener((details) => {
	if (details.reason === 'install' || details.reason === 'update') {
		browser.tabs.create(
			{
				"url":"https://alpaca-honke.github.io/twishare-to-misskey/installed.html"
			}
		);
	}
});

