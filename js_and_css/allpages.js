//右下のシェアボタン
setButtonIfNeeded();
//チャンネルに投稿ボタン
setChannnelShareButton();

//以下全部関数定義（処理は以上）

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
		const is_misskey_or_calckey = await isMisskeyOrCalckey();
		if (is_misskey_or_calckey) {
			return false;
		}
	}
	if (items.button_visibility === false) {
		return false;
	}
	return true;
}

async function isMisskeyOrCalckey() {
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
async function isMisskey() {
	let metatags = document.getElementsByTagName('meta');
	for (let i = 0; i < metatags.length; i++){
		var metatag = metatags[i];
		if (
			metatag.getAttribute('name') === 'application-name' &&
            (metatag.getAttribute('content') === 'Misskey')
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
			//JSが取得するURLは、マルチバイト文字がエンコードされた状態になっている
			const now_url = location.href;
			const now_title = document.title;

			const instance_url = new URL(`https://${instance_name}/share`);
			//textパラメータにタイトルと2重エンコードしたURLの両方を渡す仕様に変更 issue #14
			//if (now_title){
			//	instance_url.searchParams.set("text", now_title);
			//}
			let share_text = now_title + "\n\n" + now_url;
			//instance_url.searchParams.set("url", encoded_now_url);
			instance_url.searchParams.set("text",share_text);
			window.open(instance_url.href);
		});
	});
}

async function setChannnelShareButton() {
    const items = await chrome.storage.sync.get("instance_name");
    const instance_name = items.instance_name || "misskey.io";
    //多分MiAuthはCalckeyじゃ使えない
    const is_misskey = await isMisskey();
    if (location.href === `https://${instance_name}/share` && is_misskey) {
        const button = document.createElement('button');
        const button_content = document.createElement('p');
        const body = document.body;
        button.id = '_twishare_to_misskey_share_to_channel';
        button_content.innerHTML = "チャンネルにシェア";
        button.appendChild(button_content);
        body.appendChild(button);
        button.addEventListener('click', async () => {
            const params = new URLSearchParams(location);
            const title = params.get('title');
            const text = params.get('text');
            const url = params.get('url');
            const share_text = `${title}\n${text}\n${url}`;
            const callback = new URL(chrome.runtime.getURL('pages/to_channel.html'));
            callback.searchParams.set('text',share_text);
            callback.searchParams.set('instance_name',instance_name);

            //トークンに紐付けられているUUIDが保存されているかどうか
            const auth = await chrome.storage.sync.get('auth');
            if (auth[instance_name]) {
                callback.searchParams.set('id',auth[instance_name]);
                location.href = callback.href;
            } else {
                const sid = window.crypto.randomUUID();
                callback.searchParams.set('id',sid);

                const miauth = new URL(`https://${instance_name}/miauth/${sid}`);

                miauth.searchParams.set('name','Twishare to Misskey');
                miauth.searchParams.set('icon','https://raw.githubusercontent.com/alpaca-honke/twishare-to-misskey/main/assets/icon.png');
                miauth.searchParams.set('permission','write:notes,read:channels');
                miauth.searchParams.set('callback',callback.href);

                location.href = miauth.href;
            }
        });
    }
}
