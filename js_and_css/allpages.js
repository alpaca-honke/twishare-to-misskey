setButtonIfNeeded();

//以下全部関数定義（処理は以上一行）

async function setButtonIfNeeded() {
	const whether_set_button = await whetherSetButton();
	if (whether_set_button) {
		setButton();
	}
}

async function whetherSetButton() {
	const is_site_to_hide_button = await isSiteToHideButton();
	if (is_site_to_hide_button) {
		return false;
	}
	// sites_to_hide_buttonはisSiteToHideButtonで読むのでここでは読まない
	const items = await chrome.storage.sync.get(["button_visibility_on_misskey", "button_visibility"]);
	if (items.button_visibility_on_misskey === false) {
		// Misskey上でボタンを表示させない設定のとき、Misskeyにアクセスしてたらfalse
		const is_misskey = await isMisskey();
		if (is_misskey) {
			return false;
		}
	}
	if (items.button_visibility === false) {
		return false;
	}
	return true;
}

async function isMisskey() {
	// MisskeyやCalckeyでは、metaタグのname="application-name"にcontent="Misskey"とか"Calckey"がついてる
	let metatags = document.getElementsByTagName('meta');
	for (let i = 0; i < metatags.length; i++){
		var metatag = metatags[i];
		if (
			metatag.getAttribute('name') === 'application-name' &&
			(metatag.getAttribute('content') === 'Misskey' || metatag.getAttribute('content') === 'Calckey')
		){
			return true;
		}
	}
	return false;
}
async function isSiteToHideButton() {
	const items = await chrome.storage.sync.get("sites_to_hide_button");
	if (items.sites_to_hide_button) {
		// 区切りのスペースごと保存してあるので展開
		let sites = items.sites_to_hide_button.split(' ');
		return sites.some((value) => {
			return value
				// 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視
				.replace(/^https?:\/\//, "")
				.replace(/\/(.*)$/, "")
				=== location.hostname;
		});
	}
	return false;
}

function setButton(){
	const body = document.body;
	const button = document.createElement('button');
	const share_img = document.createElement('img');
	button.id = '_twishare_to_misskey_share';
	share_img.src = chrome.runtime.getURL('assets/share.png');
	share_img.id = '_twishare_to_misskey_share_img';
	button.appendChild(share_img);
	body.appendChild(button);
	button.addEventListener('click', () => {
		chrome.storage.sync.get("instance_name").then((items) => {
			const instance_name = items.instance_name || "misskey.io";
			const now_url = location.href;
			const now_title = document.title;

			const instance_url = new URL(`https://${instance_name}/share`);
			if (now_title){
				instance_url.searchParams.set("text", now_title);
			}
			instance_url.searchParams.set("url", now_url);
			location.href = instance_url.href;
		});
	});
}
