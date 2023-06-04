browser.runtime.onInstalled.addListener(() => {
	browser.tabs.create(
		{
			"url":"https://alpaca-honke.github.io/twishare-to-misskey/installed.html"
		}
	);
});
