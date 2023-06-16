browser.storage.sync.get("instance_name").then((items) => {
	const instance_name = items.instance_name || "misskey.io";

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
		//2重エンコードをurlパラメータにわたすことで正常動作しているものが、
		//今後のMisskeyの更新でうまく動かない可能性がある(1重エンコードを渡す仕様になるかも)ため
		//urlパラメータは当分使わない (twishare-to-misskey issue #14)
		//let share_url;

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
			share_text = tagged_hashtags;
			//share_textにURLも含めるためここではまだsetしない
			//instance_url.searchParams.set("text", share_text);
		}

		if (url) {
			//デコード前と後に変化がなくなるまでデコードを繰り返す
			let before_decode_url = url;
			let decoded_url = "";
			//予期せぬ無限ループ対策として4ループまでしかしないことにする
			for (let i=0 ; i<4 ; i++) {
				//2周目以降ならdecoded_urlには値が入ってるのでそれをbefore_decode_urlに代入
				before_decode_url = decoded_url ? decoded_url : before_decode_url ;
				decoded_url = decodeURIComponent(before_decode_url);
				if (decoded_url === before_decode_url) {
					break;
				}
			}

			//share_url = url;
			const encoded_url = encodeURI(decoded_url);
			share_text = (share_text || "") + "\n\n" + (encoded_url || "");
			//instance_url.searchParams.set("url", share_url);
		}
		instance_url.searchParams.set('text',share_text);

		window.open(instance_url.href);
	}
});
