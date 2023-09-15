//chromeでも拡張機能向けAPIをbrowserネームスペースからアクセスできるようにする
if (typeof browser === 'undefined') {
    //宣言せずに定義することでグローバル変数とする
    browser = chrome;
}

//表示をロケールによって変えるjs
document.getElementById('version').innerHTML = 'v' + browser.i18n.getMessage('Version') + ' ';
document.getElementById('installed').innerHTML = browser.i18n.getMessage('ShowUpdateLogLink');
document.getElementById('instance_name_form_label').innerHTML = browser.i18n.getMessage('InstanceNameFormLabel');
document.getElementById('instance_name').placeholder = browser.i18n.getMessage('InstanceNameFormPlaceHolder');
document.getElementById('share_button_toggle_label').innerHTML = browser.i18n.getMessage('ShareButtonToggleLabel');
document.getElementById('share_button_on_misskey_toggle_label').innerHTML = browser.i18n.getMessage('ShareButtonOnMisskeyToggleLabel');
document.getElementById('share_button_hide_form_label').innerHTML = browser.i18n.getMessage('ShareButtonHideFormLabel');
document.getElementById('sites_to_hide_button').placeholder = browser.i18n.getMessage('ShareButtonHideFormPlaceHolder');

document.addEventListener('DOMContentLoaded', Load);
document.getElementById('instance_name').onkeydown = () => {Save();};
document.getElementById('button_visibility').addEventListener('change', Save);
document.getElementById('button_visibility_on_misskey').addEventListener('change', Save);
document.getElementById('sites_to_hide_button').onkeydown = () => {Save();};
document.getElementById('installed').addEventListener('click',showInstalled);

function Save() {
    //呼び出し後速攻実行されると不具合が出ることがある
    setTimeout( () => {
        const instanceName = document.getElementById('instance_name').value || 'misskey.io';
        const buttonVisibility = document.getElementById('button_visibility').checked;
        const buttonVisibilityOnMisskey = document.getElementById('button_visibility_on_misskey').checked;
        const sitesToHideButton = document.getElementById('sites_to_hide_button').value;
        browser.storage.sync.set(
            {
                instanceName: instanceName
                    // 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視して保存する
                    .replace(/^https?:\/\//, '')
                    .replace(/\/(.*)$/, ''),
                buttonVisibility: buttonVisibility,
                buttonVisibilityOnMisskey: buttonVisibilityOnMisskey,
                // スペース区切りは使うときに処理する
                sitesToHideButton: sitesToHideButton,
            }
        ).then(
            SucceedSave()
        );
    }
    ,100)
}

function Load() {
	browser.storage.sync.get(['instanceName','buttonVisibility','buttonVisibilityOnMisskey','sitesToHideButton']).then((items) => {
        document.getElementById('instance_name').value =
            items.instanceName || 'misskey.io';
		if (items.buttonVisibility !== false){
			document.getElementById('button_visibility').checked = true;
		}
		if (items.buttonVisibilityOnMisskey !== false){
			document.getElementById('button_visibility_on_misskey').checked = true;
		}
        document.getElementById('sites_to_hide_button').value = items.sitesToHideButton || null; 
    });
}

function SucceedSave() {
	const saveStatus = document.getElementById('save_status');
	saveStatus.innerHTML = browser.i18n.getMessage('SavedMassage');
	saveStatus.style.color = '#55c500'
}

function showInstalled() {
	window.open('https://alpaca-honke.github.io/twishare-to-misskey/installed.html');
}
