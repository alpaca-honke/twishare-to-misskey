
function Save() {
    const instance_name =
        document.getElementById("instance_name").value || "Misskey.io";
	const button_visibility = document.getElementById("button_visibility").checked;
    browser.storage.sync.set(
    // 文頭のhttps://と/が出た以降から文末までの文字 がある場合、その文字列を無視して保存する
        {
            instance_name: instance_name
                .replace(/^https?:\/\//, "")
                .replace(/\/(.*)$/, ""),
			button_visibility: button_visibility
		}
	).then(
		SucceedSave()
	);
}

function Load() {
	browser.storage.sync.get("instance_name").then((items) => {
        document.getElementById("instance_name").value =
            items.instance_name || "Misskey.io";
    });
	chrome.storage.sync.get("button_visibility").then((items) => {
		if (items.button_visibility !== false){
			document.getElementById('button_visibility').checked = true;
		}
	});
}

function SucceedSave() {
	const save_status = document.getElementById("save_status");
	save_status.innerHTML = "保存されました！";
	save_status.style.color = "#55c500"
	Load();
}

<<<<<<< HEAD
<<<<<<< HEAD
function FailedSave() {
	const save_status = document.getElementById("save_status");
	save_status.innerHTML = "保存できませんでした";
	save_status.style.color = "#ff0000";
}

=======
>>>>>>> 4f45fa5 (tterシェアボタンがないページでもシェアできるようにボタンの挙動を追加)
=======
>>>>>>> bc4221b (Merge branch 'feature/floating_share_button' into develop)
document.addEventListener("DOMContentLoaded", Load);
document.getElementById("instance_name").onkeydown = (e) => {
	if(e.key === "Enter"){
		Save();
	}
};
document.getElementById("save_button").addEventListener("click", Save);
