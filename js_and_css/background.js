const browserAPI = chrome ? chrome : browser ;
browserAPI.runtime.onInstalled.addListener((details) => {
	if (details.reason === "install" || details.reason === "update") {
		browserAPI.tabs.create(
			{
				"url":"https://alpaca-honke.github.io/twishare-to-misskey/installed.html"
			}
		);
	}
});

