const result = window.confirm('Twitter へのシェアリンクを確認しました。この内容を Misskey.io にシェアしますか？(拡張機能 Twishare to io より)')

if (result) {
	let tw_url = new URL(window.location.href);
	let params = tw_url.searchParams;
	let text;
	let url;
	let hashtags;
	let share_text;
	let share_url

	if ( params.has('text') ) {
		text = params.get('text');
	}
	if ( params.has('url') ) {
		url = params.get('url');
	}
	if ( params.has('hashtags') ) {
		hashtags = params.get('hashtags');
	}

	let io_url = new URL("https://misskey.io/share");

	if (text){
		if (hashtags){
			tagged_hashtags = '#' + hashtags.replace(/\,/g, ' #');
			share_text = text + '\n' + tagged_hashtags;
		}else{
			share_text = text;
		}
	}else if (hashtags){
		tagged_hashtags = ' #' + hashtags.replace(/\,/g, ' #');
		share_text = encodeURIComponent(tagged_hashtags);
	}
	io_url.searchParams.set('text',share_text);
	
	if (url) {
		share_url = url;
		io_url.searchParams.set('url',share_url);
	}
	

	location.href = io_url;
}
