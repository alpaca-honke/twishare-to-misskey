//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === "undefined") {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

//表示をロケールによって変えるjs
document.getElementById('version').innerHTML = "v" + browser.i18n.getMessage('Version') + " ";
document.getElementById('installed').innerHTML = browser.i18n.getMessage('ShowUpdateLogLink');
document.getElementById('InstanceNameFormLabel').innerHTML = browser.i18n.getMessage('InstanceNameFormLabel');
document.getElementById('instance_name').placeholder = browser.i18n.getMessage('InstanceNameFormPlaceHolder');
document.getElementById('ShareButtonToggleLabel').innerHTML = browser.i18n.getMessage('ShareButtonToggleLabel');
document.getElementById('ShareButtonOnMisskeyToggleLabel').innerHTML = browser.i18n.getMessage('ShareButtonOnMisskeyToggleLabel');
document.getElementById('ShareButtonHideFormLabel').innerHTML = browser.i18n.getMessage('ShareButtonHideFormLabel');
document.getElementById('sites_to_hide_button').placeholder = browser.i18n.getMessage('ShareButtonHideFormPlaceHolder');

document.addEventListener("DOMContentLoaded", Load);
document.getElementById("instance_name").onkeydown = () => {Save();};
document.getElementById('button_visibility').addEventListener('change', Save);
document.getElementById('button_visibility_on_misskey').addEventListener('change', Save);
document.getElementById("sites_to_hide_button").onkeydown = () => {Save();};
document.getElementById('installed').addEventListener("click",showInstalled);

function Save() {
    //呼び出し後速攻実行されると不具合が出ることがある
    setTimeout( () => {
        const instance_name = document.getElementById("instance_name").value || "misskey.io";
        const button_visibility = document.getElementById("button_visibility").checked;
        const button_visibility_on_misskey = document.getElementById("button_visibility_on_misskey").checked;
        const sites_to_hide_button = document.getElementById("sites_to_hide_button").value;
        browser.storage.sync.set(
            {
                instance_name: instance_name
                    // 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視して保存する
                    .replace(/^https?:\/\//, "")
                    .replace(/\/(.*)$/, ""),
                button_visibility: button_visibility,
                button_visibility_on_misskey: button_visibility_on_misskey,
                // スペース区切りは使うときに処理する
                sites_to_hide_button: sites_to_hide_button,
            }
        ).then(
            SucceedSave()
        );
    }
    ,100)
}

function Load() {
	browser.storage.sync.get(["instance_name","button_visibility","button_visibility_on_misskey","sites_to_hide_button"]).then((items) => {
        document.getElementById("instance_name").value =
            items.instance_name || "misskey.io";
		if (items.button_visibility !== false){
			document.getElementById('button_visibility').checked = true;
		}
		if (items.button_visibility_on_misskey !== false){
			document.getElementById('button_visibility_on_misskey').checked = true;
		}
        document.getElementById("sites_to_hide_button").value = items.sites_to_hide_button || null; 
    });
}

function SucceedSave() {
	const save_status = document.getElementById("save_status");
	save_status.innerHTML = browser.i18n.getMessage('SavedMassage');
	save_status.style.color = "#55c500"
}

function showInstalled() {
	window.open('https://alpaca-honke.github.io/twishare-to-misskey/installed.html');
}
