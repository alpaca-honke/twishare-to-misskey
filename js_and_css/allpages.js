//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === "undefined") {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

setButtonIfNeeded();

//以下全部関数定義（処理は以上一行）

async function setButtonIfNeeded() {
	if (await whetherSetButton()) {
		setButton();
		hideButtonOnFullscreen();
	}
}

async function whetherSetButton() {
	if (await isSiteToHideButton()) {
		return false;
	}
	// sitesToHideButtonはisSiteToHideButtonで読むのでここでは読まない
	const items = await browser.storage.sync.get(["buttonVisibilityOnMisskey", "buttonVisibility"]);
	if (items.buttonVisibilityOnMisskey === false) {
		// Misskey上でボタンを表示させない設定のとき、Misskeyにアクセスしてたらfalse
		if (await isMisskey()) {
			return false;
		}
	}
	if (items.buttonVisibility === false) {
		return false;
	}
	return true;
}

async function isMisskey() {
	// MisskeyやCalckeyでは、metaタグのname="application-name"にcontent="Misskey"とか"Calckey"がついてる
	let metatags = document.getElementsByTagName('meta');
    const misskeys = ['Misskey','Calckey','Firefish'];
	for (const metatag of metatags){
		if (
			metatag.getAttribute('name') === 'application-name' &&
            misskeys.includes(metatag.getAttribute('content'))
		){
			return true;
		}
	}
	return false;
}
async function isSiteToHideButton() {
	const items = await browser.storage.sync.get("sitesToHideButton");
	if (items.sitesToHideButton) {
		// 区切りのスペースごと保存してあるので展開
		let sites = items.sitesToHideButton.split(' ');
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
	const shareImg = document.createElement('img');
	button.id = '_twishare_to_misskey_share';
	shareImg.src = browser.runtime.getURL('assets/share.png');
	shareImg.id = '_twishare_to_misskey_share_img';
	button.appendChild(shareImg);
	body.appendChild(button);

    //以下クリックorドラッグ時
    //変数の定義
    let isDragging = false;
    let isClickEnabled = true;
    let cursorX;
    let cursorY;

    //挙動を設定:マウスドラッグ
    //ブラウザーデフォルトのドラッグを無効化しておく
    button.ondragstart = () => {
        return false;
    };
    button.addEventListener('mousedown',(event) => {
        if (event.button === 0) {isDragging = true};
    });
    button.addEventListener('mousemove',(event) => {
        if (isDragging && event.button === 0) {
            //ドラッグ
            isClickEnabled = false;
            cursorX = event.clientX;
            cursorY = event.clientY;
            //なんか配置がうまく行かなかったので要素幅の3/4倍がちょうどよかった
            button.style.top = (cursorY-3*button.getBoundingClientRect().height/4) + "px";
            button.style.left = (cursorX-3*button.getBoundingClientRect().width/4) + "px";
        } else {
            return;
        };
    });
    button.addEventListener('mouseup',(event) => {
        if (event.button === 0) {
            isDragging = false;
            if (isClickEnabled) buttonClicked();
            isClickEnabled = true;
        };
    });
    //予期せずボタン外でマウスアップされてもドラッグをオフにする
    window.addEventListener('mouseup',() => {
        isDragging = false;
        isClickEnabled = true;
    });

    //挙動を設定:スワイプ
    button.addEventListener('touchstart',(event) => {
        //画面スクロールを止める
        event.preventDefault();
        isDragging = true;
    });
    button.addEventListener('touchmove',(event) => {
        if (isDragging) {
            event.preventDefault();
            //スワイプ
            isClickEnabled = false;
            cursorX = event.changedTouches[0].clientX;
            cursorY = event.changedTouches[0].clientY;
            //なんか配置がうまく行かなかったので要素幅の3/4倍がちょうどよかった
            button.style.top = (cursorY-3*button.getBoundingClientRect().height/4) + "px";
            button.style.left = (cursorX-3*button.getBoundingClientRect().width/4) + "px";
        } else {
            return;
        };
    });
    button.addEventListener('touchend',(event) => {
        event.preventDefault();
        isDragging = false;
        if (isClickEnabled) buttonClicked();
        isClickEnabled = true;
    });
    //予期せずボタン外でタッチエンドされてもドラッグをオフにする
    window.addEventListener('touchend',() => {
        isDragging = false;
        isClickEnabled = true;
    });
}

function buttonClicked() {
    browser.storage.sync.get(["instanceName"]).then((items) => {
        const instanceName = items.instanceName || "misskey.io";
        const tweetRegex = /^https?:\/\/twitter\.com\/\w+\/status\/\d+.*$/;

        if (tweetRegex.test(location.href)){
            const tweet = document.querySelector('article div[data-testid="tweetText"]');
            //TwemojiのUnicode絵文字化
            const twemojis = tweet.querySelectorAll("img");
            for (const twemoji of twemojis) {
                const emoji = twemoji.alt;
                const emojiTextNode = document.createTextNode(emoji);
                tweet.replaceChild(emojiTextNode, twemoji);
            }
            const tweetText = tweet.textContent;

            const tweetUsername = document.querySelector('article div[data-testid="User-Name"]').textContent;
            //MFMの引用型に変換処理（謎にワンライナーで書いたのはゆるして）
            const replacedTweetText = tweetText.split("\n").map(line => line ? "><plain>" + line + "</plain>" : ">").join("\n");
            let nowUrl = location.href;
            //シェア用リンクが生成されたときに付与される、端末タイプの判別IDを除去
            nowUrl = nowUrl.replace(/[\?&]s=\w+&?/,'');
            const instanceUrl = new URL(`https://${instanceName}/share`);
            let shareText = `${replacedTweetText}\n>by <plain>${tweetUsername}</plain>\n\n${nowUrl}`;
            instanceUrl.searchParams.set("text",shareText);
            window.open(instanceUrl.href);
        } else {
            //JSが取得するURLは、マルチバイト文字がエンコードされた状態になっている
            const nowUrl = location.href;
            const nowTitle = document.title;

            const instanceUrl = new URL(`https://${instanceName}/share`);
            //textパラメータにタイトルと2重エンコードしたURLの両方を渡す仕様に変更 issue #14
            let shareText = nowTitle + "\n\n" + nowUrl;
            instanceUrl.searchParams.set("text",shareText);
            window.open(instanceUrl.href);
        }

    });
}

function hideButtonOnFullscreen(){
	document.addEventListener('fullscreenchange', () => {
		const button = document.querySelector('#_twishare_to_misskey_share');
		if (button == null){ return; }

		const toFullscreen = document.fullscreenElement;
		if (toFullscreen) { button.classList.add('hidden'); }
		else { button.classList.remove('hidden'); }
	});
}
