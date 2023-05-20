chrome.storage.sync.get("instance_name", function (items) {
	const instance_name = items.instance_name || "Misskey.io";

	const result = window.confirm(
		`Twitter へのシェアリンクを確認しました。この内容を ${instance_name} にシェアしますか？(拡張機能 Twishare to Misskey より)`
	);

	if (result) {
		let tw_url = new URL(window.location.href);
		let params = tw_url.searchParams;
		let text;
		let url;
		let hashtags;
		let share_text;
		let share_url;

		if (params.has("text")) {
			text = params.get("text");
		}
		if (params.has("url")) {
			url = params.get("url");
		}
		if (params.has("hashtags")) {
			hashtags = params.get("hashtags");
		}

		let instance_url = new URL(`https://${instance_name}/share`);

		if (text) {
			if (hashtags) {
				const tagged_hashtags = "#" + hashtags.replace(/\,/g, " #");
				share_text = text + "\n" + tagged_hashtags;
			} else {
				share_text = text;
			}
			instance_url.searchParams.set("text", share_text);
		} else if (hashtags) {
			const tagged_hashtags = " #" + hashtags.replace(/\,/g, " #");
			share_text = encodeURIComponent(tagged_hashtags);
			instance_url.searchParams.set("text", share_text);
		}

		if (url) {
			share_url = url;
			instance_url.searchParams.set("url", share_url);
		}

		location.href = instance_url;
	}
});
