//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === 'undefined') {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

browser.storage.sync.get('instanceName').then((items) => {
	const instanceName = items.instanceName || 'misskey.io';

	const result = window.confirm(
        browser.i18n.getMessage('ConfirmShareMessage',instanceName)
	);

	if (result) {
		let urlFromTweet = new URL(window.location.href);
		let params = urlFromTweet.searchParams;
		let text;
		let url;
		let hashtags;
		let shareText;
		//2重エンコードをurlパラメータにわたすことで正常動作しているものが、
		//今後のMisskeyの更新でうまく動かない可能性がある(1重エンコードを渡す仕様になるかも)ため
		//urlパラメータは当分使わない (twishare-to-misskey issue #14)

		if (params.has('text')) {
            text = params.get('text').replace( /(@\w{1,15})/g ,'<plain>$1</plain>');
		}
		if (params.has('url')) {
			url = params.get('url');
		}
		if (params.has('hashtags')) {
			hashtags = params.get('hashtags');
		}

		let instanceUrl = new URL(`https://${instanceName}/share`);

		if (text) {
			if (hashtags) {
				const taggedHashtags = '#' + hashtags.replace(/\,/g, ' #');
				shareText = text + '\n' + taggedHashtags;
			} else {
				shareText = text;
			}
			instanceUrl.searchParams.set('text', shareText);
		} else if (hashtags) {
			const taggedHashtags = ' #' + hashtags.replace(/\,/g, ' #');
			shareText = taggedHashtags;
			//shareTextにURLも含めるためここではまだsetしない
		}

		if (url) {
			//デコード前と後に変化がなくなるまでデコードを繰り返す
			let beforeDecodeUrl = url;
			let decodedUrl = '';
			//予期せぬ無限ループ対策として4ループまでしかしないことにする
			for (let i=0 ; i<4 ; i++) {
				//2周目以降ならdecodedUrlには値が入ってるのでそれをbeforeDecodeUrlに代入
				beforeDecodeUrl = decodedUrl ? decodedUrl : beforeDecodeUrl ;
				decodedUrl = decodeURIComponent(beforeDecodeUrl);
				if (decodedUrl === beforeDecodeUrl) {
					break;
				}
			}
            //YouTube動画の末尾のトラッキングID（と思われる）パラメータを削除
            const youtube = /^https?:\/\/youtu\.?be(\.com)?/;
            if (youtube.test(decodedUrl)) {
                decodedUrl = decodedUrl.replace(/[\?&]si=\w+&?/,'');
            }

            const encodedUrl = encodeURI(decodedUrl);
            shareText = (shareText || '') + '\n\n' + (encodedUrl || '');
		}
		instanceUrl.searchParams.set('text',shareText);

		location.href = instanceUrl.href;
	}
});
