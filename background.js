chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.create(
		{
			"url":"https://alpaca-honke.github.io/twishare-to-misskey/installed.html"
		}
	);
});
