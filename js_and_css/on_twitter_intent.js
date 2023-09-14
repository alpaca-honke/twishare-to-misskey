//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === "undefined") {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

browser.storage.sync.get("instance_name").then((items) => {
	const instance_name = items.instance_name || "misskey.io";

	const result = window.confirm(
        browser.i18n.getMessage("ConfirmShareMessage",instance_name)
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
            text = params.get("text").replace( /(@\w{1,15})/g ,'<plain>$1</plain>');
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
            //YouTube動画の末尾のトラッキングID（と思われる）パラメータを削除
            const youtube = /^https?:\/\/youtu\.?be(\.com)?/;
            if (youtube.test(decoded_url)) {
                decoded_url = decoded_url.replace(/[\?&]si=\w+&?/,'');
            }

            const encoded_url = encodeURI(decoded_url);
            share_text = (share_text || "") + "\n\n" + (encoded_url || "");
		}
		instance_url.searchParams.set('text',share_text);

		location.href = instance_url.href;
	}
});
